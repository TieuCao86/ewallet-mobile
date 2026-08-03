import { useMutation, useQueryClient } from "@tanstack/react-query";

import topUpService from "../services/topup.service";
import { DepositConfirmRequest } from "../types/topup";

export const useConfirmTopUp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DepositConfirmRequest) => {
            return topUpService.confirmDeposit(data);
        },

        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

            queryClient.invalidateQueries({
                queryKey: ["transactions"],
            });
        },
    });
};