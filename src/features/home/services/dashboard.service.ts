import { DashboardResponse } from "@/features/home/types/dashboard";
import { API, ApiResponse, axiosClient } from "@/shared/api";

class DashboardService {
  async getDashboard(): Promise<ApiResponse<DashboardResponse>> {
    const response =
      await axiosClient.get<ApiResponse<DashboardResponse>>(
        API.DASHBOARD
      );

    return response.data;
  }
}

export default new DashboardService();