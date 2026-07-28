import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HomeHeaderProps {
    unreadCount?: number;
    onPressNotification?: () => void;
    onPressSearch?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
    unreadCount = 0,
    onPressNotification,
    onPressSearch,
}) => {
    return (
        <View style={styles.headerTop}>
            <Text style={styles.brandText}>VT Bank</Text>

            <TouchableOpacity style={styles.searchBtn} onPress={onPressSearch}>
                <MaterialCommunityIcons name="magnify" size={20} color="#005BEA" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.notificationBtn} onPress={onPressNotification}>
                <MaterialCommunityIcons name="bell" size={20} color="#005BEA" />
                {unreadCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    brandText: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', fontStyle: 'italic' },
    searchBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
    notificationBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', position: 'relative' },
    badge: { position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4 },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});