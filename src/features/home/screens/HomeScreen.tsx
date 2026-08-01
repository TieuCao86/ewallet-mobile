import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDashboard } from "@/features/home/hooks/useDashboard";

import ExpenseChart from "@/features/home/components/ExpenseChart";
import { FavoriteActions } from "@/features/home/components/FavoriteActions";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { ServiceGrid } from "@/features/home/components/ServiceGrid";
import { WalletBalanceCard } from "@/features/home/components/WalletBalanceCard";


export default function HomeScreen() {

  const {
    data: dashboard,
    refreshing,
    onRefresh
  } = useDashboard();


  const handleGoToTopUp = () => {
    router.push("/topup");
  };


  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}

      >

        <LinearGradient
          colors={["#005BEA", "#00C6FB"]}
          style={styles.topWrapper}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >

          <HomeHeader
            unreadCount={
              dashboard?.unreadNotificationCount
            }
          />


          <WalletBalanceCard

            balance={
              dashboard?.balance
            }

            fullName={
              dashboard?.fullName
            }

            walletNumber={
              dashboard?.walletNumber
            }

            onTopUp={
              handleGoToTopUp
            }

          />

        </LinearGradient>


        <View style={styles.contentBody}>

          <FavoriteActions
            onTopUp={handleGoToTopUp}
          />


          <ServiceGrid />


          <ExpenseChart

            financialHistory={
              dashboard?.financialStats?.history
            }

            setActiveTab={(tab) => {

              if (tab === "transactions") {
                router.push(
                  "/transaction/history"
                );
              }

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