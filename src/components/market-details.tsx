import { colors, fontFamily } from "@/styles/theme";
import { Text, View } from "react-native";
import { MarketInfo } from "./market-info";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

export type TMarket = {
  address: string;
  categoryId: string;
  coupons: number;
  cover: string;
  description: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  rules: [
    {
      description: string;
      id: string;
      marketId: string;
    }
  ];
};

interface IMarketDetailsProps {
  data: TMarket;
}

export function MarketDetails({ data }: IMarketDetailsProps) {
  return (
    <View
      style={{
        padding: 32,
        paddingBottom: 0,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: colors.gray[100],
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: fontFamily.bold,
          color: colors.gray[600],
        }}
      >
        {data.name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fontFamily.regular,
          color: colors.gray[500],
          marginTop: 12,
          marginBottom: 32,
          lineHeight: 22,
        }}
      >
        {data.description}
      </Text>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[200],
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontFamily.medium,
            color: colors.gray[500],
            marginBottom: 12,
          }}
        >
          Informações
        </Text>
        <MarketInfo
          description={`${data.coupons} cupons disponíveis.`}
          icon={IconTicket}
        />
        <MarketInfo description={data.address} icon={IconMapPin} />
        <MarketInfo description={data.phone} icon={IconPhone} />
      </View>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[200],
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontFamily.medium,
            color: colors.gray[500],
            marginVertical: 12,
          }}
        >
          Regulamento
        </Text>
        {data.rules.map((item) => (
          <Text key={item.id} style={{}}>
            {`\u2022 ${item.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
