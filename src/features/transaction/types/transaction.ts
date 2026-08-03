export type TransactionType = "TRANSFER" | "TOP_UP" | "WITHDRAW";

export type TransactionDirection = "IN" | "OUT";

export type TransactionFilterType = "ALL" | TransactionDirection;

export type TransactionStatus = "SUCCESS" | "PENDING" | "FAILED";


/**
 * Danh sách giao dịch
 * GET /api/transactions
 */
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


/**
 * Filter lịch sử giao dịch
 */
export interface TransactionFilterRequest {
    page?: number;
    size?: number;

    type?: TransactionType;

    direction?: TransactionDirection;

    status?: TransactionStatus;

    fromDate?: string;

    toDate?: string;
}


/**
 * Chi tiết giao dịch
 * GET /api/transactions/{code}
 */
export interface TransactionResponse {

    id: number;

    transactionCode: string;

    amount: number;

    fee: number;

    balanceAfter: number;

    type: TransactionType;

    status: TransactionStatus;

    senderName: string | null;

    receiverName: string | null;

    otherPartyName: string | null;

    description: string;

    createdAt: string;

    completedAt: string | null;
}


/**
 * Kết quả sau khi thực hiện giao dịch
 * POST topup / transfer / withdraw
 */
export interface TransactionResultResponse {

    transactionCode: string;

    amount: number;

    fee: number;

    balanceAfter: number;

    type: TransactionType;

    status: TransactionStatus;

    senderName: string | null;

    receiverName: string | null;

    description: string;

    completedAt: string | null;
}