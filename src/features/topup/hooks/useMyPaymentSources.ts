import { useQuery } from "@tanstack/react-query";
import topUpService from "../services/topup.service";

export const useMyPaymentSources = () => {

    return useQuery({
        queryKey: ["myBanks"],
        queryFn: async () => {
            const res = await topUpService.getMyPaymentSources();

            return res.data;
        },

        staleTime: 1000 * 60 * 5,

    });

};