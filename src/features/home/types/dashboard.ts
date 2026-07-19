import { BannerResponse } from "./banner";
import { FinancialStatsResponse } from "./financial";

export type KycStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

export interface DashboardResponse {
    fullName: string;
    email: string;

    kycStatus: KycStatus;

    walletNumber: string;
    balance: number;

    unreadNotificationCount: number;

    marketingBanners: BannerResponse[];

    financialStats: FinancialStatsResponse;
}