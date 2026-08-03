import { useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useEffect, useState } from "react";

import { setAccessToken } from "@/shared/api/axiosClient";
import AuthService from "../services/auth.service";

interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync("userToken");

      if (savedToken) {
        setToken(savedToken);
        setAccessToken(savedToken);
      }
    } catch (error) {
      console.log(error);
      await SecureStore.deleteItemAsync("userToken");
      setToken(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await AuthService.login({ email, password });
    const accessToken = response.data.accessToken;

    await SecureStore.setItemAsync("userToken", accessToken);
    setToken(accessToken);
    setAccessToken(accessToken);
  };

  const logout = async () => {
    setToken(null);
    setAccessToken(null);

    await SecureStore.deleteItemAsync("userToken");

    // Xóa toàn bộ cache (Bao gồm cả queryKey ["dashboard"]) khi logout
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
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