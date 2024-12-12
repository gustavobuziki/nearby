import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { api } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@/components/loading";
import { MarketCover } from "@/components/market-cover";
import { MarketDetails, TMarket } from "@/components/market-details";
import { MarketCoupon } from "@/components/market-coupon";
import { Button } from "@/components/button";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Clipboard from "expo-clipboard";

export default function Market() {
  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();
  const qrLock = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<TMarket | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get<TMarket>(`/markets/${params.id}`);

      setMarketData(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        Alert.alert("Câmera", "Você precisa habilitar o uso da câmera.");
      }
      qrLock.current = false;
      setModalIsOpen(true);
    } catch (error) {
      Alert.alert("Câmera", "Não foi possível utilizar a câmera.");
      return;
    }
  }

  function handleUseCupon(id: string) {
    setModalIsOpen(false);

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente utilizar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  const copyToClipboard = async (code: string) => {
    await Clipboard.setStringAsync(code);
  };

  async function getCoupon(id: string) {
    setCouponIsFetching(true);

    try {
      const { data } = await api.patch<{ coupon: string }>(`/coupons/${id}`);

      Alert.alert("Cupom", data.coupon, [
        { text: "OK" },
        { text: "Copiar", onPress: () => copyToClipboard(data.coupon) },
      ]);
      setCoupon(data.coupon);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível utilizar o cupom");
    } finally {
      setCouponIsFetching(false);
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [coupon, params.id]);

  if (isLoading) {
    return <Loading />;
  }

  return marketData ? (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={modalIsOpen} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <MarketCover uri={marketData.cover} />
        <MarketDetails data={marketData} />
        {coupon && <MarketCoupon code="FM4G666S" />}
      </ScrollView>
      {marketData.coupons > 0 && (
        <View style={{ padding: 32 }}>
          <Button onPress={handleOpenCamera}>
            <Button.Title>Ler QR code</Button.Title>
          </Button>
        </View>
      )}
      <Modal style={{ flex: 1 }} visible={modalIsOpen}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              handleUseCupon(data);
            }
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <Button
            onPress={() => setModalIsOpen(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  ) : (
    <Redirect href="/home" />
  );
}
