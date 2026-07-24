import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from "@/shared/components/AppButton";
import AppInput from "@/shared/components/AppInput";

import BankGrid from "../components/BankGrid";
import BankSearch from "../components/BankSearch";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const banks = [
    {
        id: "1",
        name: "VCB",
        logo: require("../../../assets/logos/vietcombank.jpg"),
    },
    {
        id: "2",
        name: "Techcombank",
        logo: require("../../../assets/logos/techcombank.jpg"),
    },
    {
        id: "3",
        name: "MB Bank",
        logo: require("../../../assets/logos/mbbank.jpg"),
    },
    {
        id: "4",
        name: "BIDV",
        logo: require("../../../assets/logos/bidv.jpg"),
    },
    {
        id: "5",
        name: "ACB",
        logo: require("../../../assets/logos/acb.jpg"),
    },
];

export default function LinkBankScreen() {
    const [account, setAccount] = useState("");
    const [autoPay, setAutoPay] = useState(false);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>VT Bank</Text>

                <BankSearch />

                <BankGrid banks={banks} />

                <Text style={styles.note}>
                    Chọn ngân hàng hoặc tìm kiếm phía trên
                </Text>

                <Text style={styles.section}>Nhập Thông Tin Liên Kết</Text>

                <AppInput
                    label="Số tài khoản"
                    placeholder="Nhập số tài khoản"
                    leftIcon={
                        <MaterialCommunityIcons
                            name="bank"
                            size={22}
                            color="#1976D2"
                        />
                    }
                />

                <PrimaryButton
                    title="LIÊN KẾT VÀ XÁC THỰC OTP"
                    onPress={() => { }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D47A1",
    },

    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 15,
    },

    section: {
        fontWeight: "bold",
        fontSize: 18,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },

    note: {
        textAlign: "center",
        marginTop: 12,
        color: "#555",
        fontSize: 12,
    },

});