import { useQuery } from "@tanstack/react-query";

import dashboardService from "../services/dashboard.service";
import { DashboardResponse } from "../types/dashboard";

export const useDashboard = () => {
    const { data, isLoading, isRefetching, refetch } =
        useQuery<DashboardResponse>({
            queryKey: ["dashboard"],
            queryFn: async () => {
                const res = await dashboardService.getDashboard();
                return res.data;
            },
            // Cache 10 giây
            staleTime: 10000,
        });

    const onRefresh = async () => {
        await refetch();
    };

    return {
        data,
        isLoading,
        refreshing: isRefetching,
        onRefresh,
        refetch,
    };
};