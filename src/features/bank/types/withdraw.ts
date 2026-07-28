export interface WithdrawRequest {
  bankId: number;
  amount: number;
  pin: string;
}

export interface WithdrawResponse {
  amount: number;
  walletBalance: number;
  bankBalance: number;
  transactionCode: string;
}