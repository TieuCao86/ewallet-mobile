import { useMutation } from "@tanstack/react-query";

import topUpService from "../services/topup.service";
import { DepositInitiateRequest } from "../types/topup";

export const useInitiateTopUp = () => {
    return useMutation({
        mutationFn: (data: DepositInitiateRequest) => {
            return topUpService.initiateDeposit(data);
        },
    });
};