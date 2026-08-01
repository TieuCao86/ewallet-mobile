import BankItem from "@/features/bank/components/BankItem";
import { BankMasterResponse } from "@/features/bank/types/bank";
import { StyleSheet, View } from "react-native";

interface BankGridProps {
  banks: BankMasterResponse[];
  selectedId: number | null;
  onSelectBank: (id: number) => void;
}

export default function BankGrid({
  banks,
  selectedId,
  onSelectBank,
}: BankGridProps) {
  return (
    <View style={styles.gridContainer}>
      {banks.map((item) => (
        <BankItem
          key={item.id}
          bank={item}
          isSelected={selectedId === item.id}
          onSelect={onSelectBank}
        />
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