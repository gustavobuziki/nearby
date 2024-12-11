import { colors, fontFamily } from "@/styles/theme";
import { Text, View } from "react-native";
import { Step } from "./step";
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

export function Steps() {
  return (
    <View style={{ gap: 24, flex: 1 }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fontFamily.regular,
          color: colors.gray[500],
        }}
      >
        Veja como funciona:
      </Text>
      <Step
        description="Veja locais perto de você que são parceiros Nearby."
        title="Encontre os estabelecimentos"
        icon={IconMapPin}
      />
      <Step
        description="Escaneie o código no estabelecimento para usar o benefício."
        title=" Ative o cupom com QR Code"
        icon={IconQrcode}
      />
      <Step
        description="Ative o cupom onde estiver em diferentes tipos de estabelecimento."
        title="Garanta vantagens perto de você"
        icon={IconTicket}
      />
    </View>
  );
}
