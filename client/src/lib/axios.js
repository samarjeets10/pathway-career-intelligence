import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.VITE_API_URL || "http://localhost:3000",
    withCredentials: true,
});

export function getErrorMessage(error) {
    return error.response?.data?.message || error.message || "Something went wrong. please try again"
}