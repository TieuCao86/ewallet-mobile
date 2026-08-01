import { BankResponse } from "@/features/bank/types/bank";
import topUpService from "@/features/topup/services/topup.service";
import { useEffect, useState } from "react";

export const useTopUp = () => {
    const [myBanks, setMyBanks] = useState<BankResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    // Lấy danh sách ngân hàng đã liên kết
    const fetchMyBanks = async () => {
        try {
            setLoading(true);
            const res = await topUpService.getMyPaymentSources();
            console.log("BANK RESPONSE:", res);
            setMyBanks(res.data || []);
        } catch (err: any) {
            console.error("Lỗi lấy danh sách ngân hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBanks();
    }, []);

    // Bước 1: Khởi tạo nạp tiền
    const handleInitiate = async (
        bankId: number,
        amount: number,
        pin: string,
        onSuccess: () => void,
        onError?: (errorMsg: string) => void
    ) => {
        try {
            setSubmitting(true);
            await topUpService.initiateDeposit({ bankId, amount, pin });
            onSuccess();
        } catch (err: any) {
            const message =
                err.response?.data?.message || "Xác thực PIN hoặc kiểm tra số dư thất bại";
            if (onError) onError(message);
        } finally {
            setSubmitting(false);
        }
    };

    // Bước 2: Xác nhận OTP
    const handleConfirm = async (
        bankId: number,
        amount: number,
        otp: string,
        onSuccess: (data: any) => void,
        onError?: (errorMsg: string) => void
    ) => {
        try {
            setSubmitting(true);
            const res = await topUpService.confirmDeposit({ bankId, amount, otp });
            onSuccess(res.data);
        } catch (err: any) {
            const message = err.response?.data?.message || "Mã OTP không chính xác";
            if (onError) onError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        myBanks,
        loading,
        submitting,
        fetchMyBanks,
        handleInitiate,
        handleConfirm,
    };
};