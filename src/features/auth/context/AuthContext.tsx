import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useEffect, useState } from "react";

import axiosClient from "@/shared/api/axiosClient";

import { DashboardResponse } from "@/features/home/types/dashboard";
import DashboardService from "../../home/services/dashboard.service";
import AuthService from "../services/auth.service";

interface AuthContextType {
  user: DashboardResponse | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<DashboardResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync("userToken");

      if (!savedToken) {
        return;
      }

      setToken(savedToken);

      axiosClient.defaults.headers.common.Authorization =
        `Bearer ${savedToken}`;

      const dashboard = await DashboardService.getDashboard();

      setUser(dashboard.data);
    } catch (error) {
      console.log("Session expired:", error);

      await SecureStore.deleteItemAsync("userToken");

      delete axiosClient.defaults.headers.common.Authorization;

      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ) => {
    // 1. Login
    const loginResponse = await AuthService.login({
      email,
      password,
    });

    const accessToken = loginResponse.data.accessToken;

    // 2. Lưu token
    await SecureStore.setItemAsync(
      "userToken",
      accessToken
    );

    axiosClient.defaults.headers.common.Authorization =
      `Bearer ${accessToken}`;

    setToken(accessToken);

    // 3. Lấy Dashboard
    const dashboardResponse =
      await DashboardService.getDashboard();

    setUser(dashboardResponse.data);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);

    delete axiosClient.defaults.headers.common.Authorization;

    await SecureStore.deleteItemAsync("userToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}