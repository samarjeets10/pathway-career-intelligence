import { api, getErrorMessage } from "../../../lib/axios";

export async function fetchReports() {
    try {
        const { data } = await api.get("/api/interview");
        return data.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function fetchReport(id) {
    try {
        const { data } = await api.get(`/api/interview/${id}`);
        return data.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function createReport({ resume, selfDescription, jobDescription }) {
    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    try {
        const { data } = await api.post("/api/interview", formData, { timeout: 120000 });
        return data.data;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}