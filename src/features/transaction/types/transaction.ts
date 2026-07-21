export type TransactionType = "TRANSFER" | "TOP_UP" | "WITHDRAW";

export type TransactionDirection = "IN" | "OUT";

export type TransactionFilterType = "ALL" | TransactionDirection;

export type TransactionStatus = "SUCCESS" | "PENDING" | "FAILED";

export interface Transaction {
  transactionCode: string;
  amount: number;
  fee: number;
  type: TransactionType;
  status: TransactionStatus;
  otherPartyName: string | null;
  description: string;
  direction: TransactionDirection;
  createdAt: string;
}

export interface TransactionFilterRequest {
  page?: number;
  size?: number;
  type?: TransactionType;
  direction?: TransactionDirection;
  status?: TransactionStatus;
  fromDate?: string;
  toDate?: string;
}