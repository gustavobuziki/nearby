import { colors, fontFamily } from "@/styles/theme";
import { categoriesIcons } from "@/utils/categories-icons";
import { Text, Pressable, PressableProps } from "react-native";

interface ICategoryProps extends PressableProps {
  iconId: string;
  isSelected?: boolean;
  name: string;
}

export function Category({
  iconId,
  name,
  isSelected = false,
  ...props
}: ICategoryProps) {
  const Icon = categoriesIcons[iconId];

  return (
    <Pressable
      style={{
        height: 36,
        backgroundColor: isSelected ? colors.green.base : colors.gray[100],
        borderWidth: isSelected ? 0 : 1,
        borderColor: colors.gray[300],
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 12,
        gap: 10,
      }}
      {...props}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text
        style={{
          fontSize: 14,
          color: colors.gray[isSelected ? 100 : 500],
          fontFamily: fontFamily.regular,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
}
