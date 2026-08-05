// Bank Master
export interface BankMasterResponse {
  id: number;
  code: string;
  name: string;
  logo: string;
}

// Bank Link / Info
export interface BankResponse {
  bankAccountId: number;
  bankId: number;
  bankName: string;
  logo: string;
  accountNumber: string;
  accountHolder: string;
  balance: number;
}

export interface LinkBankRequest {
  bankId: number;
  accountNumber: string;
}

export interface LinkBankResponse {
  id: number;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}
