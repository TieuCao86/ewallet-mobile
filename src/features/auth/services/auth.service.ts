import { API, ApiResponse, axiosClient } from "@/shared/api";
import { LoginData, LoginRequest, RegisterRequest } from "../types/auth";

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

  async register(
    request: RegisterRequest
  ): Promise<ApiResponse<void>> {

    const response = await axiosClient.post<ApiResponse<void>>(
      `${API.AUTH}/register`,
      request
    );

    return response.data;
  }
}

export default new AuthService();