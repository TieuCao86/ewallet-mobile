import { StyleSheet, View } from "react-native";
import BankItem from "./BankItem";

export default function BankGrid({ banks }: any) {
  return (
    <View style={styles.gridContainer}>
      {banks.map((item: any) => (
        <BankItem key={item.id} bank={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
});