import { API, ApiResponse, axiosClient } from "@/shared/api";
import {
    Transaction,
    TransactionFilterRequest,
} from "../types/transaction";

import { PageResponse } from "@/shared/api/pageResponse";

class TransactionService {
    /**
     * GET /api/transactions
     */
    async getTransactions(
        filter?: TransactionFilterRequest
    ): Promise<ApiResponse<PageResponse<Transaction>>> {
        const response = await axiosClient.get<ApiResponse<PageResponse<Transaction>>>(
            API.TRANSACTIONS,
            { params: filter }
        );

        return response.data;
    }

    // /**
    //  * POST /api/transactions/transfer/initiate
    //  */
    // async initiateTransfer(
    //     request: TransferRequest
    // ): Promise<ApiResponse<void>> {
    //     const response = await axiosClient.post<ApiResponse<void>>(
    //         `${API.TRANSACTIONS}/transfer/initiate`, // FIX: Đổi tại đây nữa
    //         request
    //     );

    //     return response.data;
    // }

    // /**
    //  * POST /api/transactions/transfer/confirm?otp=...
    //  */
    // async confirmTransfer(
    //     request: TransferRequest,
    //     otp: string
    // ): Promise<ApiResponse<TransferResponse>> {
    //     const response = await axiosClient.post<ApiResponse<TransferResponse>>(
    //         `${API.TRANSACTIONS}/transfer/confirm`, // FIX: Đổi tại đây nữa
    //         request,
    //         { params: { otp } }
    //     );

    //     return response.data;
    // }
}

export default new TransactionService();