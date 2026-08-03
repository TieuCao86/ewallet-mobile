import { useMutation, useQueryClient } from "@tanstack/react-query";
import bankService from "../services/bank.service";

export const useLinkBank = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bankService.linkBank,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["myBanks"],
            });
        },
    });
};