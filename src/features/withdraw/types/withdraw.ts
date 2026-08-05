
export interface WithdrawInitiateRequest {
    bankId: number;
    amount: number;
    pin: string;
}


export interface WithdrawConfirmRequest {
    bankId: number;
    amount: number;
    otp: string;
}
