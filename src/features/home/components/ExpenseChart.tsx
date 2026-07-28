import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- 1. DEFINE TYPES & INTERFACES ---
export interface MonthData {
    label: string;
    income: number;
    expense: number;
}

// Khớp DTO: Map<Integer, MonthData> từ Spring Boot Backend
export type FinancialHistory = Record<number, MonthData>;

interface ExpenseChartProps {
    financialHistory?: FinancialHistory | null;
    setActiveTab?: (tab: string) => void;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ financialHistory = null, setActiveTab }) => {
    // --- 2. XỬ LÝ MỐC THỜI GIAN ĐỘNG (Tháng hiện tại T, T-1, T-2) ---
    const currentMonth = new Date().getMonth() + 1;
    const mCurrent = currentMonth;
    const mPrev1 = ((currentMonth - 2 + 12) % 12) + 1;
    const mPrev2 = ((currentMonth - 3 + 12) % 12) + 1;

    const [selectedMonth, setSelectedMonth] = useState<number>(mCurrent);

    // --- 3. BỘ KHUNG DỰ PHÒNG (FALLBACK) ---
    const defaultData: FinancialHistory = useMemo(() => ({
        [mPrev2]: { label: `Tháng ${mPrev2}`, income: 0, expense: 0 },
        [mPrev1]: { label: `Tháng ${mPrev1}`, income: 0, expense: 0 },
        [mCurrent]: { label: `Tháng ${mCurrent}`, income: 0, expense: 0 }
    }), [mPrev2, mPrev1, mCurrent]);

    // --- 4. BINDING DỮ LIỆU ĐỘNG TỪ BACKEND ---
    const chartData: FinancialHistory = useMemo(() => {
        if (!financialHistory) return defaultData;
        return {
            [mPrev2]: financialHistory[mPrev2] || defaultData[mPrev2],
            [mPrev1]: financialHistory[mPrev1] || defaultData[mPrev1],
            [mCurrent]: financialHistory[mCurrent] || defaultData[mCurrent]
        };
    }, [financialHistory, defaultData, mPrev2, mPrev1, mCurrent]);

    // Lấy thông tin thu/chi của tháng đang chọn
    const activeFinancials: MonthData = chartData[selectedMonth] || defaultData[selectedMonth];

    // --- 5. TÍNH TOÁN CHIỀU CAO CỘT ---
    const maxAmount = useMemo(() => {
        const allNumbers = Object.values(chartData).flatMap(d => [d.income, d.expense]);
        return Math.max(...allNumbers, 100000); // Mốc sàn 100,000 VND
    }, [chartData]);

    const calcHeight = (val?: number): number => {
        if (!val || val === 0) return 8;
        return Math.max((val / maxAmount) * 90, 8);
    };

    return (
        <View style={styles.container}>
            {/* 📈 QUẢN LÝ TÀI CHÍNH CÁ NHÂN (CỘT ĐÔI THU/CHI) */}
            <View style={styles.chartCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Quản lý tài chính cá nhân</Text>
                    {setActiveTab && (
                        <TouchableOpacity
                            style={styles.detailBtn}
                            onPress={() => setActiveTab('transactions')}
                        >
                            <Text style={styles.detailBtnText}>Chi tiết</Text>
                            <MaterialCommunityIcons name="chevron-right" size={16} color="#005BEA" />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.financeContent}>
                    {/* CỘT TỔNG THU / TỔNG CHI BÊN TRÁI */}
                    <View style={styles.summarySide}>
                        <View style={styles.monthSelector}>
                            <Text style={styles.monthSelectorText}>{activeFinancials.label}</Text>
                            <MaterialCommunityIcons name="eye-outline" size={16} color="#6B7280" />
                        </View>

                        <View style={styles.statItem}>
                            <View style={[styles.legendDot, styles.incomeDot]} />
                            <View>
                                <Text style={styles.statLabel}>Tổng thu</Text>
                                <Text style={styles.statAmount}>
                                    {(activeFinancials.income || 0).toLocaleString('vi-VN')} đ
                                </Text>
                            </View>
                        </View>

                        <View style={styles.statItem}>
                            <View style={[styles.legendDot, styles.expenseDot]} />
                            <View>
                                <Text style={styles.statLabel}>Tổng chi</Text>
                                <Text style={styles.statAmount}>
                                    {(activeFinancials.expense || 0).toLocaleString('vi-VN')} đ
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.updateTimestamp}>
                            Cập nhật: {new Date().toLocaleDateString('vi-VN')}
                        </Text>
                    </View>

                    {/* CỘT CẶP CỘT THU/CHI BÊN PHẢI */}
                    <View style={styles.chartSide}>
                        {/* Tháng T-2 */}
                        <TouchableOpacity
                            style={[styles.barGroup, selectedMonth === mPrev2 && styles.activeBarGroup]}
                            onPress={() => setSelectedMonth(mPrev2)}
                        >
                            <View style={styles.doubleBars}>
                                <View style={[styles.bar, styles.expenseBar, { height: calcHeight(chartData[mPrev2]?.expense) }]} />
                                <View style={[styles.bar, styles.incomeBar, { height: calcHeight(chartData[mPrev2]?.income) }]} />
                            </View>
                            <View style={selectedMonth === mPrev2 ? styles.monthPill : styles.monthLabelBox}>
                                <Text style={selectedMonth === mPrev2 ? styles.monthPillText : styles.monthLabelText}>
                                    T{mPrev2}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Tháng T-1 */}
                        <TouchableOpacity
                            style={[styles.barGroup, selectedMonth === mPrev1 && styles.activeBarGroup]}
                            onPress={() => setSelectedMonth(mPrev1)}
                        >
                            <View style={styles.doubleBars}>
                                <View style={[styles.bar, styles.expenseBar, { height: calcHeight(chartData[mPrev1]?.expense) }]} />
                                <View style={[styles.bar, styles.incomeBar, { height: calcHeight(chartData[mPrev1]?.income) }]} />
                            </View>
                            <View style={selectedMonth === mPrev1 ? styles.monthPill : styles.monthLabelBox}>
                                <Text style={selectedMonth === mPrev1 ? styles.monthPillText : styles.monthLabelText}>
                                    T{mPrev1}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Tháng T hiện tại */}
                        <TouchableOpacity
                            style={[styles.barGroup, selectedMonth === mCurrent && styles.activeBarGroup]}
                            onPress={() => setSelectedMonth(mCurrent)}
                        >
                            <View style={styles.doubleBars}>
                                <View style={[styles.bar, styles.expenseBar, { height: calcHeight(chartData[mCurrent]?.expense) }]} />
                                <View style={[styles.bar, styles.incomeBar, { height: calcHeight(chartData[mCurrent]?.income) }]} />
                            </View>
                            <View style={selectedMonth === mCurrent ? styles.monthPill : styles.monthLabelBox}>
                                <Text style={selectedMonth === mCurrent ? styles.monthPillText : styles.monthLabelText}>
                                    T{mCurrent}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ExpenseChart;

const styles = StyleSheet.create({
    container: { marginTop: 16 },
    chartCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
    detailBtn: { flexDirection: 'row', alignItems: 'center' },
    detailBtnText: { fontSize: 12, color: '#005BEA', fontWeight: '600' },

    // QLTC Nội dung
    financeContent: { flexDirection: 'row', justifyContent: 'space-between' },
    summarySide: { flex: 1, paddingRight: 10 },
    monthSelector: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
    monthSelectorText: { fontSize: 13, fontWeight: '700', color: '#374151' },

    statItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    incomeDot: { backgroundColor: '#22C55E' },
    expenseDot: { backgroundColor: '#EF4444' },
    statLabel: { fontSize: 11, color: '#6B7280' },
    statAmount: { fontSize: 13, fontWeight: '700', color: '#111827' },
    updateTimestamp: { fontSize: 9, color: '#9CA3AF', marginTop: 4 },

    // Biểu đồ cột
    chartSide: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 12,
        height: 120,
        paddingBottom: 4,
    },
    barGroup: { alignItems: 'center', padding: 4, borderRadius: 8 },
    activeBarGroup: { backgroundColor: '#F0F7FF' },
    doubleBars: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
        height: 90,
    },
    bar: { width: 10, borderRadius: 4 },
    expenseBar: { backgroundColor: '#EF4444' },
    incomeBar: { backgroundColor: '#22C55E' },
    monthLabelBox: { marginTop: 6 },
    monthLabelText: { fontSize: 11, color: '#6B7280', fontWeight: '500' },
    monthPill: { marginTop: 6, backgroundColor: '#005BEA', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
    monthPillText: { fontSize: 11, color: '#FFFFFF', fontWeight: '700' },
});