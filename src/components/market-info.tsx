import { colors, fontFamily } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";
import { View, Text } from "react-native";

interface IMarketInfoProps {
  description: string;
  icon: React.ComponentType<IconProps>;
}

export function MarketInfo({ description, icon: Icon }: IMarketInfoProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Icon size={16} color={colors.gray[400]} />
      <Text
        style={{
          color: colors.gray[500],
          fontFamily: fontFamily.regular,
          lineHeight: 22.4,
          flex: 1,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
