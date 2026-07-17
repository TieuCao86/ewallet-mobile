import axiosClient from "@/shared/api/axiosClient";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    tokenType: string | null;
    userId: number;
    email: string;
    role: string;
  };
}

class AuthService {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await axiosClient.post<LoginResponse>(
      "/api/auth/login",
      request
    );

    return response.data;
  }
}

export default new AuthService();