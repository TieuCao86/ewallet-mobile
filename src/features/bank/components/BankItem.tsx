import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

export default function BankItem({ bank }: any) {
    return (
        <TouchableOpacity style={styles.container}>
            <Image
                // Tự động kiểm tra: Nếu là chuỗi URL thì bọc { uri: ... }, nếu là require() thì truyền thẳng
                source={typeof bank.logo === "string" ? { uri: bank.logo } : bank.logo}
                style={styles.logo}
            />

            <Text numberOfLines={1} style={styles.name}>
                {bank.name}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "25%",
        alignItems: "center",
        marginTop: 15,
    },

    logo: {
        width: 52,
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        resizeMode: "contain",
    },

    name: {
        marginTop: 6,
        fontSize: 12,
    },
});