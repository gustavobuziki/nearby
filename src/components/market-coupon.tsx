import { colors, fontFamily } from "@/styles/theme";
import { IconTicket } from "@tabler/icons-react-native";
import { View, Text } from "react-native";
import { Button } from "./button";
import * as Clipboard from "expo-clipboard";

interface IMarketCouponProps {
  code: string;
}

export function MarketCoupon({ code }: IMarketCouponProps) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
  };

  return (
    <View style={{ padding: 32 }}>
      <Text
        style={{
          color: colors.gray[500],
          fontFamily: fontFamily.medium,
          marginBottom: 12,
          fontSize: 14,
        }}
      >
        Utilize esse cupom:
      </Text>
      <Button
        style={{
          width: "100%",
          paddingVertical: 12,
          flexDirection: "row",
          backgroundColor: colors.green.base,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          gap: 8,
        }}
        onPress={() => copyToClipboard()}
      >
        <Button.Icon icon={IconTicket} />
        <Button.Title>{code}</Button.Title>
      </Button>
    </View>
  );
}
