import { View, ImageBackground } from "react-native";
import { Button } from "./button";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { colors } from "@/styles/theme";

interface IMarketCoverProps {
  uri: string;
}

export function MarketCover({ uri }: IMarketCoverProps) {
  return (
    <ImageBackground
      source={{ uri }}
      style={{
        width: "100%",
        height: 232,
        marginBottom: -32,
        backgroundColor: colors.gray[200],
      }}
    >
      <View style={{ padding: 24, paddingTop: 56 }}>
        <Button
          style={{
            width: 40,
            height: 40,
            backgroundColor: colors.green.base,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
          }}
          onPress={() => router.back()}
        >
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
