import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TransactionFilter from "../components/TransactionFilter";
import TransactionItem from "../components/TransactionItem";
import SearchBar from "../components/TransactionSearch";
import { transactions } from "../mock/transaction.mock";
import { TransactionType } from "../types/transaction";

export default function TransactionHistoryScreen() {
    const [filter, setFilter] = useState<TransactionType>("ALL");
    const [keyword, setKeyword] = useState("");

    const data = useMemo(() => {
        return transactions.filter((item) => {
            const matchType = filter === "ALL" || item.type === filter;
            const matchKeyword = item.title
                .toLowerCase()
                .includes(keyword.toLowerCase());

            return matchType && matchKeyword;
        });
    }, [filter, keyword]);

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="arrow-left" size={28} />
                </TouchableOpacity>

                < Text style={styles.title} > Lịch sử giao dịch </Text>

                < View style={{ width: 28 }
                } />
            </View>

            < View style={{ padding: 16 }}>
                <TransactionFilter value={filter} onChange={setFilter} />
                <SearchBar value={keyword} onChange={setKeyword} />
            </View>

            < FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionItem item={item} />}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                }}
            />
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
        fontSize: 22,
        fontWeight: "700",
    },
});