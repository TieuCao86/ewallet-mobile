// DTO gửi yêu cầu nạp tiền trực tiếp vào ví
export interface TopUpRequest {
    amount: number;
}

// DTO phản hồi sau khi nạp tiền thành công
export interface TopUpResponse {
    walletNumber: string;
    amount: number;
    newBalance: number;
    transactionCode: string;
}

// DTO phản hồi số dư ví
export interface WalletBalanceResponse {
    walletNumber: string;
    balance: number;
}