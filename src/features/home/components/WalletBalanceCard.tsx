import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WalletBalanceCardProps {
    balance?: number;
    fullName?: string;
    walletNumber?: string;
}

export const WalletBalanceCard: React.FC<WalletBalanceCardProps> = ({
    balance = 0,
    fullName = '',
    walletNumber = '',
}) => {
    return (
        <View style={styles.balanceContainer}>
            <View style={styles.balanceHeader}>
                <View>
                    <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
                    <Text style={styles.balanceValue}>
                        {balance.toLocaleString('vi-VN')} đ
                    </Text>
                </View>
                <View style={styles.userTag}>
                    <Text style={styles.userTagText}>👤 {fullName}</Text>
                </View>
            </View>

            <View style={styles.balanceFooter}>
                <Text style={styles.accountLabel}>TÀI KHOẢN</Text>
                <View style={styles.accountNumberBox}>
                    <Text style={styles.accountNumber}>{walletNumber}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});