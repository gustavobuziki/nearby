import { ActivityIndicator } from "react-native";
import { colors } from "@/styles/theme";

export function Loading() {
  return (
    <ActivityIndicator
      color={colors.green.base}
      style={{
        flex: 1,
        backgroundColor: colors.gray[100],
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
