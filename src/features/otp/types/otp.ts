export enum OtpType {
    REGISTER = "REGISTER",
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
    TRANSACTION = "TRANSACTION",
    TOPUP = "TOPUP",
    WITHDRAW = "WITHDRAW",
    TRANSFER = "TRANSFER",
}

export interface SendOtpRequest {
    type: OtpType;
}

export interface VerifyOtpRequest {
    phone: string;
    otp: string;
    type: OtpType;
}