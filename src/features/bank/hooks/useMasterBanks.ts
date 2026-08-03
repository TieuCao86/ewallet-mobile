import { useQuery } from "@tanstack/react-query";
import bankService from "../services/bank.service";

export const useMasterBanks = () => {
    return useQuery({
        queryKey: ["masterBanks"],
        queryFn: async () => {
            const res = await bankService.getMasterBanks();
            return res.data;
        },
        staleTime: 1000 * 60 * 30, // 30 phút
    });
};