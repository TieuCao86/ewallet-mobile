import { API, ApiResponse, axiosClient } from "@/shared/api";
import { LoginData, LoginRequest } from "../types/auth";

class AuthService {
  async login(
    request: LoginRequest
  ): Promise<ApiResponse<LoginData>> {
    const response = await axiosClient.post<ApiResponse<LoginData>>(
      `${API.AUTH}/login`,
      request
    );

    return response.data;
  }
}

export default new AuthService();