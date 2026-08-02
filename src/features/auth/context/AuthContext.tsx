import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useEffect, useState } from "react";

import { DashboardResponse } from "@/features/home/types/dashboard";
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DashboardResponse | null>(null);
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
      }
    } catch (error) {
      console.log(error);
      await SecureStore.deleteItemAsync("userToken");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const loginResponse = await AuthService.login({ email, password });
    const accessToken = loginResponse.data.accessToken;

    await SecureStore.setItemAsync("userToken", accessToken);
    setToken(accessToken);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
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