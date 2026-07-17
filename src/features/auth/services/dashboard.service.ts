import axiosClient from "@/shared/api/axiosClient";

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    fullName: string;
    email: string;
    kycStatus: string;
    walletNumber: string;
    balance: number;
    marketingBanners: Array<{
      id: number;
      title: string;
      imageUrl: string;
      redirectUrl: string;
    }>;
  };
  errorCode: string | null;
  timestamp: string | null;
  path: string | null;
}

class DashboardService {
  async getDashboard(): Promise<DashboardResponse> {
    const response = await axiosClient.get<DashboardResponse>("/api/dashboard");
    
    // Trả về trực tiếp dữ liệu thô (hoặc response.data tùy bạn gán tầng sâu)
    // Để đồng bộ với các bước trên, trả về response.data
    return response.data;
  }
}

export default new DashboardService();