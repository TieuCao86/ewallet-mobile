import { AuthProvider } from "@/features/auth/context/AuthContext";
import QueryProvider from "@/shared/providers/QueryProvider";

import { Stack } from "expo-router";


export default function RootLayout() {

  return (

    <QueryProvider>

      <AuthProvider>

        <Stack
          screenOptions={{
            headerShown: false
          }}
        />

      </AuthProvider>

    </QueryProvider>

  );

}