import { api, getErrorMessage } from "@/lib/axios"

export async function register({ username, email, password }) {
    try {
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password,
        });

        return response.data.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password,
        });

        return response.data.data;
    } catch (error) {
        throw new Error(getErrorMessage("Failed to login",error));
    }
}

export async function logout() {
    try {
        const response = await api.post("/api/auth/logout");
        return response.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return { user: response.data.user }
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}
