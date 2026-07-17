import axiosClient from '@/shared/api/axiosClient';
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useEffect, useState } from 'react';
import AuthService from "../services/auth.service";
import DashboardService from "../services/dashboard.service";

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrapAsync() {
      try {
        const savedToken = await SecureStore.getItemAsync('userToken');
        if (savedToken) {
          setToken(savedToken);
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;

          // Đồng bộ lại luồng tự động tải dữ liệu Dashboard khi mở app
          const dashboard = await DashboardService.getDashboard();
          setUser(dashboard.data); // Nhận trực tiếp từ Service đã bóc tách dữ liệu
        }
      } catch (e) {
        console.log('Session expired or error loading token');
      } finally {
        setLoading(false);
      }
    }
    bootstrapAsync();
  }, []);

  const login = async (email: string, password: string) => {
    // SỬA LỖI 1: Gọi hàm từ AuthService
    const loginData = await AuthService.login({
      email,
      password,
    });

    // Bóc tách token từ khối 'data' theo đúng kiểu dữ liệu LoginResponse của bạn
    const accessToken = loginData.data.accessToken;

    await SecureStore.setItemAsync("userToken", accessToken);
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setToken(accessToken);

    // SỬA LỖI 2: Gọi Dashboard Service
    const dashboardData = await DashboardService.getDashboard();
    
    // Nạp trọn vẹn thông tin chi tiết vào state user
    setUser(dashboardData.data);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    delete axiosClient.defaults.headers.common['Authorization'];
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}