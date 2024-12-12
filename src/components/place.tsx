import { colors, fontFamily } from "@/styles/theme";
import { IconTicket } from "@tabler/icons-react-native";
import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";

export type TPlace = {
  id: string;
  name: string;
  description: string;
  cupons: number;
  cover: string;
  address: string;
};

interface IPlaceProps extends TouchableOpacityProps {
  data: TPlace;
}

export function Place({ data, ...props }: IPlaceProps) {
  return (
    <TouchableOpacity
      style={{
        height: 120,
        width: "100%",
        padding: 8,
        borderWidth: 1,
        borderColor: colors.gray[200],
        borderRadius: 12,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
      }}
      {...props}
    >
      <Image
        source={{ uri: data.cover }}
        style={{
          width: 116,
          height: 104,
          backgroundColor: colors.gray[200],
          borderRadius: 8,
        }}
      />
      <View style={{ flex: 1, gap: 4 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontFamily.regular,
            color: colors.gray[600],
          }}
        >
          {data.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontFamily.regular,
            color: colors.gray[500],
          }}
        >
          {data.description}
        </Text>
        <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
          <IconTicket size={16} color={colors.red.base} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: fontFamily.regular,
              color: colors.gray[400],
            }}
          >
            {data.cupons} cupons disponíveis
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
