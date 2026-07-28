export interface DepositRequest {
  bankId: number;
  amount: number;
  pin: string;
}

export interface DepositResponse {
  amount: number;
  walletBalance: number;
  bankBalance: number;
  transactionCode: string;
}