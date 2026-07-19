export interface MonthData {
    label: string;
    income: number;
    expense: number;
}

export interface FinancialStatsResponse {
    history: Record<number, MonthData>;
}