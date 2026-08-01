// DTO Khởi tạo nạp tiền (Bước 1: Check PIN & gửi OTP)
export interface DepositInitiateRequest {
    bankId: number;
    amount: number;
    pin: string;
}

// DTO Xác nhận nạp tiền (Bước 2: Verify OTP & trừ/cộng tiền)
export interface DepositConfirmRequest {
    bankId: number;
    amount: number;
    otp: string;
}

// Response trả về sau khi nạp tiền thành công
export interface TopUpResponse {
    walletNumber: string;
    amount: number;
    newBalance: number;
    transactionCode: string;
}