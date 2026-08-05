import { BankResponse } from "@/features/bank/types/bank";
import { API, ApiResponse, axiosClient } from "@/shared/api";
import {
    TopUpConfirmRequest,
    TopUpInitiateRequest
} from "../types/topup";

import {
    TransactionResultResponse
} from "@/features/transaction/types/transaction";

class TopUpService {
    // Lấy danh sách tài khoản ngân hàng liên kết để chọn nguồn nạp
    async getMyPaymentSources(): Promise<ApiResponse<BankResponse[]>> {
        const response = await axiosClient.get<ApiResponse<BankResponse[]>>(
            API.BANKS
        );
        return response.data;
    }

    // Bước 1: Khởi tạo nạp tiền
    async initiateDeposit(
        payload: TopUpInitiateRequest
    ): Promise<ApiResponse<void>> {
        const response = await axiosClient.post<ApiResponse<void>>(
            API.TOPUP_INITIATE,
            payload
        );
        return response.data;
    }

    // Bước 2: Xác nhận OTP nạp tiền
    async confirmDeposit(
        payload: TopUpConfirmRequest
    ): Promise<ApiResponse<TransactionResultResponse>> {

        const response =
            await axiosClient.post<ApiResponse<TransactionResultResponse>>(
                API.TOPUP_CONFIRM,
                payload
            );

        return response.data;
    }
}

export default new TopUpService();