import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from "@/features/auth/hooks/useAuth";
import { FavoriteActions } from '../components//FavoriteActions';
import { HomeHeader } from '../components//HomeHeader';
import { ServiceGrid } from '../components//ServiceGrid';
import { WalletBalanceCard } from '../components//WalletBalanceCard';
import ExpenseChart from '../components/ExpenseChart';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* TOP BANNER GRADIENT */}
        <LinearGradient
          colors={['#005BEA', '#00C6FB']}
          style={styles.topWrapper}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <HomeHeader
            unreadCount={user?.unreadNotificationCount}
          />
          <WalletBalanceCard
            balance={user?.balance}
            fullName={user?.fullName}
            walletNumber={user?.walletNumber}
          />
        </LinearGradient>

        {/* CONTENT BODY */}
        <View style={styles.contentBody}>
          <FavoriteActions />

          <ServiceGrid />

          <ExpenseChart
            financialHistory={user?.financialStats?.history}
            setActiveTab={(tab) => {
              if (tab === 'transactions') router.push('/transaction/history');
            }}
          />
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F9' },
  scrollView: { flex: 1 },
  topWrapper: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentBody: { paddingHorizontal: 14 },
});