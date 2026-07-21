import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TransactionFilter from "../components/TransactionFilter";
import TransactionItem from "../components/TransactionItem";
import SearchBar from "../components/TransactionSearch";

import transactionService from "../services/transaction.service";
import { Transaction, TransactionFilterType } from "../types/transaction";

export default function TransactionHistoryScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<TransactionFilterType>("ALL");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Load danh sách từ API - Tự chuyển "ALL" thành undefined bên trong hàm
  const loadTransactions = useCallback(
    async (currentFilter: TransactionFilterType) => {
      try {
        setLoading(true);

        const response = await transactionService.getTransactions({
          page: 0,
          size: 10,
          direction: currentFilter === "ALL" ? undefined : currentFilter,
        });

        setTransactions(response.data.content || []);
      } catch (error) {
        console.error("Load transaction error:", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  // Tự động fetch lại dữ liệu khi đổi tab Filter
  useEffect(() => {
    loadTransactions(filter);
  }, [filter, loadTransactions]);

  // Xử lý kéo xuống làm mới (Pull-to-refresh) - Hết lỗi ts(2345)
  const handleRefresh = () => {
    setRefreshing(true);
    loadTransactions(filter);
  };

  // Lọc local theo từ khóa tìm kiếm
  const filteredData = useMemo(() => {
    if (!keyword.trim()) return transactions;

    const searchTerm = keyword.trim().toLowerCase();
    return transactions.filter(
      (item) =>
        item.otherPartyName?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.transactionCode?.toLowerCase().includes(searchTerm)
    );
  }, [transactions, keyword]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={28} />
        </TouchableOpacity>

        <Text style={styles.title}>Lịch sử giao dịch</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Bộ lọc & Tìm kiếm */}
      <View style={styles.filterContainer}>
        <TransactionFilter
          value={filter}
          onChange={(value) => setFilter(value)}
        />
        <SearchBar value={keyword} onChange={setKeyword} />
      </View>

      {/* Danh sách giao dịch */}
      {loading && !refreshing ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0A84FF" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.transactionCode}
          renderItem={({ item }) => <TransactionItem item={item} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>Không tìm thấy giao dịch nào</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 15,
    color: "#888",
  },
});