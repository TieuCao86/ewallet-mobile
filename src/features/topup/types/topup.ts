// DTO Khởi tạo nạp tiền (Bước 1: Check PIN & gửi OTP)
export interface TopUpInitiateRequest {
    bankAccountId:number;
    amount:number;
    pin:string;
}

// DTO Xác nhận nạp tiền (Bước 2: Verify OTP & trừ/cộng tiền)
export interface TopUpConfirmRequest {
    bankAccountId:number;
    amount:number;
    otp:string;
}