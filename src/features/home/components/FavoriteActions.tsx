import { AppIconButton } from '@/shared/components/AppIconButton/AppIconButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const FavoriteActions: React.FC = () => {
    return (
        <View style={styles.container}>
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
                <AppIconButton
                    iconName="history"
                    title="Lịch sử GD"
                    variant="circle-blue"
                    onPress={() => router.push('/transaction/history')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 16 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
    customizeRow: { flexDirection: 'row', alignItems: 'center' },
    seeMoreText: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
    circleGrid: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 6, borderRadius: 20 },
});