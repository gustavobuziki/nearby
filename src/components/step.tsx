import { fontFamily, colors } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";
import { Text, View } from "react-native";

interface IStepProps {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

export function Step({ description, title, icon: Icon }: IStepProps) {
  return (
    <View style={{ width: "100%", flexDirection: "row", gap: 16 }}>
      {Icon && <Icon size={32} color={colors.green.light} />}
      <View style={{ flex: 1, gap: 6 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fontFamily.semiBold,
            color: colors.gray[600],
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontFamily.regular,
            color: colors.gray[500],
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
