import { AppIconButton } from '@/shared/components/AppIconButton/AppIconButton';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ServiceGrid: React.FC = () => {
    return (
        <View style={styles.container}>
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
                <AppIconButton
                    iconName="bank-plus"
                    title="Liên kết NH"
                    variant="grid-card"
                    onPress={() => router.push('/bank/link')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 16 },
    sectionHeader: { marginBottom: 10 },
    sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
    cardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' },
});