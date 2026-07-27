// Bank Master
export interface BankMasterResponse {
  id: number;
  code: string;
  name: string;
  logo: string;
}

// Bank Link / Info
export interface BankResponse {
  id: number;
  bankId: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  balance: number;
}

export interface LinkBankRequest {
  bankId: number;
  accountNumber: string;
  phone: string;
}

export interface LinkBankResponse {
  id: number;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

// Deposit & Withdraw
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