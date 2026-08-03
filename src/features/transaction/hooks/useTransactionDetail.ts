import { useQuery } from "@tanstack/react-query";
import transactionService from "../services/transaction.service";

export const useTransactionDetail = (code?: string) => {
    return useQuery({
        queryKey: ["transaction-detail", code],

        queryFn: async () => {
            const response =
                await transactionService.getDetail(code!);

            return response.data;
        },

        enabled: !!code,
    });
};