import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
} from "react-native";

function Button({ children }: TouchableOpacityProps) {
  return <TouchableOpacity>{children}</TouchableOpacity>;
}

function Title({ children }: TextProps) {
  return <Text>{children}</Text>;
}

Button.Title = Title;

export { Button };
