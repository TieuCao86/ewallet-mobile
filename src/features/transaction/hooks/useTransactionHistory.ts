import { useQuery } from "@tanstack/react-query";

import transactionService from "../services/transaction.service";
import { TransactionFilterType } from "../types/transaction";

export const useTransactionHistory = (filter: TransactionFilterType) => {
    return useQuery({
        queryKey: ["transactions", filter],
        queryFn: async () => {
            const response = await transactionService.getTransactions({
                page: 0,
                size: 10,
                direction: filter === "ALL" ? undefined : filter,
            });

            return response.data;
        },
        staleTime: 10000,
    });
};