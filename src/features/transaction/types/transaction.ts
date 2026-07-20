export type TransactionType = "ALL" | "IN" | "OUT";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "IN" | "OUT";
  createdAt: string;
}