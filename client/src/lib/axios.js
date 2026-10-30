import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true,
});

export function getErrorMessage(error) {
    return (
        error.response?.data?.message || error.message || "Something went wrong. please try again"
    )
}

let refreshPromise = null;

api.interceptors.response.use((res) => res,
    async (error) => {
        const original = error.config;
        const url = original?.url || "";
        const isAuthCall = ["/login", "/register", "/refresh-token", "/logout"].some((p) => url.includes(p));

        if (error.response?.status !== 401 || original._retry || isAuthCall) {
            return Promise.reject(error);
        }

        original._retry = true;

        try {
                
            refreshPromise ??= api.post("/api/auth/refresh-token").finally(() => {
                refreshPromise = null;
            })

            await refreshPromise;
            return api(original);

        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
)