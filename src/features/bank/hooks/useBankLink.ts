import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import bankService from "../services/bank.service";
import { BankMasterResponse, LinkBankRequest } from "../types/bank";

export const useBankLink = () => {
    const [masterBanks, setMasterBanks] = useState<BankMasterResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Tải danh sách Ngân hàng hệ thống
    const fetchMasterBanks = async () => {
        try {
            setLoading(true);
            const res = await bankService.getMasterBanks();
            setMasterBanks(res.data || []);
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || error?.message || "Không thể tải danh sách ngân hàng";
            Alert.alert("Lỗi", errorMsg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMasterBanks();
    }, []);

    // Lọc ngân hàng theo ô tìm kiếm
    const filteredBanks = useMemo(() => {
        if (!searchQuery.trim()) return masterBanks;
        return masterBanks.filter(
            (bank) =>
                bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bank.code.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [masterBanks, searchQuery]);

    // Validate form liên kết
    const validate = (bankId: number | null, accountNumber: string, phone: string) => {
        if (!bankId) {
            Alert.alert("Thông báo", "Vui lòng chọn ngân hàng liên kết");
            return false;
        }
        if (!/^\d{8,20}$/.test(accountNumber)) {
            Alert.alert("Thông báo", "Số tài khoản phải chứa từ 8 - 20 chữ số");
            return false;
        }
        if (!/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(phone)) {
            Alert.alert("Thông báo", "Số điện thoại không hợp lệ");
            return false;
        }
        return true;
    };

    // Thực hiện gọi API Liên kết
    const handleLinkBank = async (
        payload: LinkBankRequest,
        onSuccess?: () => void
    ) => {
        if (!validate(payload.bankId, payload.accountNumber, payload.phone)) {
            return;
        }

        try {
            setSubmitting(true);
            const res = await bankService.linkBank(payload);
            res.message || `Đã liên kết ngân hàng ${res.data.bankName} thành công!`
            if (onSuccess) onSuccess();
        } catch (error: any) {
            Alert.alert("Lỗi", error?.response?.data?.message || "Liên kết thất bại");
        } finally {
            setSubmitting(false);
        }
    };

    return {
        masterBanks: filteredBanks,
        loading,
        submitting,
        searchQuery,
        setSearchQuery,
        handleLinkBank,
        refetchMasterBanks: fetchMasterBanks,
    };
};