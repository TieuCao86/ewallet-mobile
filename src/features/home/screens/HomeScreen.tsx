import { useAuth } from "@/features/auth/hooks/useAuth";
import { AppIconButton } from '@/shared/components/AppIconButton/AppIconButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* KHỐI NỀN XANH TOP HEADER & THẺ SỐ DƯ LIỀN MẠCH THEO THIẾT KẾ VT BANK */}
        <LinearGradient
          colors={['#005BEA', '#00C6FB']}
          style={styles.topWrapper}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Thanh Header Top */}
          <View style={styles.headerTop}>
            <Text style={styles.brandText}>VT Bank</Text>

            {/* Thanh Tìm kiếm bo góc dẹt */}
            <TouchableOpacity style={styles.searchBtn}>
              <MaterialCommunityIcons
                name="magnify"
                size={20}
                color="#005BEA"
              />
            </TouchableOpacity>

            {/* Nút Chuông Thông báo nền trắng tròn */}
            <TouchableOpacity style={styles.notificationBtn}>
              <MaterialCommunityIcons name="bell" size={20} color="#005BEA" />
              {(user?.unreadNotificationCount ?? 0) > 0 && (
                <>
                  <View style={styles.notiDot} />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {user!.unreadNotificationCount > 99
                        ? "99+"
                        : user!.unreadNotificationCount}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Khối hiển thị số dư kính mờ (Glassmorphism) */}
          <View style={styles.balanceContainer}>
            <View style={styles.balanceHeader}>
              <View>
                <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
                <Text style={styles.balanceValue}>
                  {(user?.balance ?? 0).toLocaleString("vi-VN")} đ
                </Text>
              </View>
              {/* Ô hiển thị Tên được bo mờ tinh tế */}
              <View style={styles.userTag}>
                <Text style={styles.userTagText}>
                  👤 {user?.fullName ?? ""}
                </Text>
              </View>
            </View>

            <View style={styles.balanceFooter}>
              <Text style={styles.accountLabel}>TÀI KHOẢN</Text>
              <View style={styles.accountNumberBox}>
                <Text style={styles.accountNumber}>
                  {user?.walletNumber ?? ""}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* PHẦN CHỨC NĂNG YÊU THÍCH (5 NÚT TRÒN XANH HÀNG NGANG) */}
        <View style={styles.contentBody}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chức năng yêu thích</Text>
            <TouchableOpacity style={styles.customizeRow}>
              <Text style={styles.seeMoreText}>Tùy chỉnh</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.circleGrid}>
            <AppIconButton iconName="arrow-down-bold" title="Nạp tiền" variant="circle-blue" />
            <AppIconButton iconName="arrow-up-bold" title="Rút tiền" variant="circle-blue" />
            <AppIconButton iconName="swap-horizontal" title="Chuyển khoản" variant="circle-blue" />
            <AppIconButton iconName="piggy-bank" title="Gửi tiết kiệm" variant="circle-blue" />
            <AppIconButton iconName="history" title="Lịch sử GD" variant="circle-blue" />
          </View>

          {/* PHẦN HOẠT ĐỘNG CHỨC NĂNG KHÁC (LƯỚI CHIA ĐỀU 3 CỘT Ô TRẮNG LỚN) */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hoạt động chức năng khác</Text>
          </View>

          <View style={styles.cardGrid}>
            <AppIconButton iconName="movie-open" title="Mua vé xem phim" variant="grid-card" />
            <AppIconButton iconName="airplane" title="Đặt vé máy bay" variant="grid-card" />
            <AppIconButton iconName="flash" title="Thanh toán hóa đơn" variant="grid-card" />
            <AppIconButton iconName="shopping" title="Mua sắm" variant="grid-card" />
            <AppIconButton iconName="shield-check" title="Bảo hiểm" variant="grid-card" />
            <AppIconButton iconName="credit-card" title="Dịch vụ thẻ" variant="grid-card" />
            <AppIconButton iconName="cash-multiple" title="Vay tiêu dùng" variant="grid-card" />
          </View>
        </View>

        {/* Padding bottom để không bị che khuất bởi TabBar điều hướng */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F6F9' },
  scrollView: { flex: 1 },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  // Nền Gradient ôm trọn đầu trang
  topWrapper: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  brandText: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', fontStyle: 'italic' },
  searchBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingHorizontal: 12, height: 36, marginHorizontal: 12 },
  searchInput: { color: '#FFFFFF', fontSize: 13, marginLeft: 6, width: '80%', padding: 0 },
  notificationBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  notiDot: { position: 'absolute', top: 8, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF3B30', borderWidth: 1, borderColor: '#FFFFFF' },

  // Khối số dư Glassmorphism
  balanceContainer: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '500' },
  balanceValue: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold', marginTop: 2 },
  userTag: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  userTagText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  balanceFooter: { marginTop: 20, paddingTop: 12, borderTopWidth: 0.5, borderColor: 'rgba(255,255,255,0.2)' },
  accountLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: '700' },
  accountNumberBox: { backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginTop: 4 },
  accountNumber: { color: '#FFFFFF', fontSize: 12, fontFamily: 'monospace', letterSpacing: 0.5 },

  // Khối body bên dưới
  contentBody: { paddingHorizontal: 14, paddingTop: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  customizeRow: { flexDirection: 'row', alignItems: 'center' },
  seeMoreText: { fontSize: 12, color: '#6B7280', fontWeight: '500' },

  // Khối 5 nút nhỏ
  circleGrid: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 6, borderRadius: 20 },

  // Lưới 3 cột ô vuông trắng
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
});