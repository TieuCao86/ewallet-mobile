import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/features/auth/hooks/useAuth";
import ExpenseChart from "@/features/home/components/ExpenseChart";
import { FavoriteActions } from "@/features/home/components/FavoriteActions";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { ServiceGrid } from "@/features/home/components/ServiceGrid";
import { WalletBalanceCard } from "@/features/home/components/WalletBalanceCard";

export default function HomeScreen() {
  const { user } = useAuth();

  // Hàm chuyển hướng sang màn hình Nạp tiền
  const handleGoToTopUp = () => {
    router.push("/topup");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP BANNER GRADIENT */}
        <LinearGradient
          colors={["#005BEA", "#00C6FB"]}
          style={styles.topWrapper}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <HomeHeader unreadCount={user?.unreadNotificationCount} />

          <WalletBalanceCard
            balance={user?.balance}
            fullName={user?.fullName}
            walletNumber={user?.walletNumber}
            onTopUp={handleGoToTopUp}
          />
        </LinearGradient>

        {/* CONTENT BODY */}
        <View style={styles.contentBody}>
          <FavoriteActions onTopUp={handleGoToTopUp} />

          <ServiceGrid />

          <ExpenseChart
            financialHistory={user?.financialStats?.history}
            setActiveTab={(tab) => {
              if (tab === "transactions") router.push("/transaction/history");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Thay thế cho View rỗng height: 100
  },
  topWrapper: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentBody: {
    paddingHorizontal: 14,
  },
});