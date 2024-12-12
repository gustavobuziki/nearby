import { colors, fontFamily } from "@/styles/theme";
import { IconProps } from "@tabler/icons-react-native";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
  ActivityIndicator,
} from "react-native";

interface IButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

function Button({ children, isLoading, ...props }: IButtonProps) {
  return (
    <TouchableOpacity
      style={{
        height: 56,
        maxHeight: 56,
        backgroundColor: colors.green.base,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 14,
      }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ActivityIndicator color={colors.gray[100]} /> : children}
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return (
    <Text
      style={{
        color: colors.gray[100],
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
      }}
    >
      {children}
    </Text>
  );
}

interface IIconProps {
  icon: React.ComponentType<IconProps>;
}

function Icon({ icon: Icon }: IIconProps) {
  return <Icon size={24} color={colors.gray[100]} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
