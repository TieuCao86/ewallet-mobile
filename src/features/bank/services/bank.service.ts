import { API, ApiResponse, axiosClient } from "@/shared/api";

import {
    BankMasterResponse,
    BankResponse,
    LinkBankRequest,
    LinkBankResponse,
} from "@/features/bank/types/bank";



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
            API.BANKS_MASTER
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
            API.BANKS_LINK,
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
}

export default new BankService();