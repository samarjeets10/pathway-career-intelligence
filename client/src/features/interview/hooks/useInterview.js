import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReport, fetchReport, fetchReports } from "../services/interview.api";

export const useReports = () => {
    useQuery({
        queryKey: ["interviews"],
        queryFn: fetchReports
    });
}

export const useReport = (id) => {
    useQuery({
        queryKey: ["interviews", id],
        queryFn: () => fetchReport(id),
        enabled: !!id
    });
}

export const useCreateReport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createReport,
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ["interviews"]
        })
    })
}