import { API, ApiResponse, axiosClient } from "@/shared/api";

import {
    BankMasterResponse,
    BankResponse,
    LinkBankRequest,
    LinkBankResponse,
} from "../types/bank";

import {
    DepositRequest,
    DepositResponse,
} from "../types/deposit";

import {
    WithdrawRequest,
    WithdrawResponse
} from "../types/withdraw";

class BankService {
    /**
     * GET /api/banks
     * Lấy danh sách ngân hàng đã liên kết của user
     */
    async getMyBanks(): Promise<ApiResponse<BankResponse[]>> {
        const response = await axiosClient.get<ApiResponse<BankResponse[]>>(
            API.BANKS
        );
        return response.data;
    }

    /**
     * GET /api/banks/master
     * Lấy danh sách ngân hàng hệ thống hỗ trợ
     */
    async getMasterBanks(): Promise<ApiResponse<BankMasterResponse[]>> {
        const response = await axiosClient.get<ApiResponse<BankMasterResponse[]>>(
            `${API.BANKS}/master`
        );
        return response.data;
    }

    /**
     * GET /api/banks/history
     * Lấy lịch sử ngân hàng
     */
    async getHistory(): Promise<ApiResponse<BankResponse[]>> {
        const response = await axiosClient.get<ApiResponse<BankResponse[]>>(
            `${API.BANKS}/history`
        );
        return response.data;
    }

    /**
     * POST /api/banks/link
     * Liên kết ngân hàng mới
     */
    async linkBank(
        request: LinkBankRequest
    ): Promise<ApiResponse<LinkBankResponse>> {
        const response = await axiosClient.post<ApiResponse<LinkBankResponse>>(
            `${API.BANKS}/link`,
            request
        );
        return response.data;
    }

    /**
     * DELETE /api/banks/{bankId}
     * Hủy liên kết ngân hàng
     */
    async unlinkBank(bankId: number): Promise<ApiResponse<void>> {
        const response = await axiosClient.delete<ApiResponse<void>>(
            `${API.BANKS}/${bankId}`
        );
        return response.data;
    }

    // ==========================================
    // --- LUỒNG NẠP TIỀN (DEPOSIT) ---
    // ==========================================

    /**
     * POST /api/banks/deposit/initiate
     * Khởi tạo giao dịch nạp tiền (Gửi OTP)
     */
    async initiateDeposit(
        request: DepositRequest
    ): Promise<ApiResponse<void>> {
        const response = await axiosClient.post<ApiResponse<void>>(
            `${API.BANKS}/deposit/initiate`,
            request
        );
        return response.data;
    }

    /**
     * POST /api/banks/deposit/confirm?otp=...
     * Xác nhận OTP nạp tiền vào ví
     */
    async confirmDeposit(
        request: DepositRequest,
        otp: string
    ): Promise<ApiResponse<DepositResponse>> {
        const response = await axiosClient.post<ApiResponse<DepositResponse>>(
            `${API.BANKS}/deposit/confirm`,
            request,
            {
                params: { otp },
            }
        );

        return response.data;
    }

    // ==========================================
    // --- LUỒNG RÚT TIỀN (WITHDRAW) ---
    // ==========================================

    /**
     * POST /api/banks/withdraw/initiate
     * Khởi tạo giao dịch rút tiền (Gửi OTP)
     */
    async initiateWithdraw(
        request: WithdrawRequest
    ): Promise<ApiResponse<void>> {
        const response = await axiosClient.post<ApiResponse<void>>(
            `${API.BANKS}/withdraw/initiate`,
            request
        );
        return response.data;
    }

    /**
     * POST /api/banks/withdraw/confirm?otp=...
     * Xác nhận OTP rút tiền về ngân hàng
     */
    async confirmWithdraw(
        request: WithdrawRequest,
        otp: string
    ): Promise<ApiResponse<WithdrawResponse>> {
        const response = await axiosClient.post<ApiResponse<WithdrawResponse>>(
            `${API.BANKS}/withdraw/confirm`,
            request,
            { params: { otp } }
        );
        return response.data;
    }
}

export default new BankService();