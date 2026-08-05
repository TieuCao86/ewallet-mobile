import { BankResponse } from "@/features/bank/types/bank";
import { TransactionResultResponse } from "@/features/transaction/types/transaction";
import { API, ApiResponse, axiosClient } from "@/shared/api";

import {
    WithdrawConfirmRequest,
    WithdrawInitiateRequest,
} from "../types/withdraw";


class WithdrawService {


    // Lấy danh sách tài khoản ngân hàng liên kết để nhận tiền rút
    async getMyWithdrawAccounts(): Promise<ApiResponse<BankResponse[]>> {

        const response = await axiosClient.get<ApiResponse<BankResponse[]>>(
            API.BANKS
        );

        return response.data;
    }



    // Bước 1: Khởi tạo rút tiền (Check PIN + gửi OTP)
    async initiateWithdraw(
        payload: WithdrawInitiateRequest
    ): Promise<ApiResponse<void>> {

        const response = await axiosClient.post<ApiResponse<void>>(
            API.WITHDRAW_INITIATE,
            payload
        );

        return response.data;
    }


    // Bước 2: Xác nhận OTP rút tiền
    async confirmWithdraw({
        otp,
        ...data
    }: WithdrawConfirmRequest): Promise<
        ApiResponse<TransactionResultResponse>
    > {

        const response = await axiosClient.post<
            ApiResponse<TransactionResultResponse>
        >(
            API.WITHDRAW_CONFIRM,
            data,
            {
                params: {
                    otp,
                },
            }
        );

        return response.data;
    }

}

export default new WithdrawService();