import MapView, { Callout, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { Alert, View, Text, Image } from "react-native";
import { api } from "@/services/api";
import { Categories, TCategory } from "@/components/categories";
import { TPlace } from "@/components/place";
import { Places } from "@/components/places";
import { colors, fontFamily } from "@/styles/theme";
import { router } from "expo-router";

import * as Location from "expo-location";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [markets, setMarkets] = useState<TPlace[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const locationDefault = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
  };

  async function fetchCategories() {
    try {
      const { data } = await api.get<TCategory[]>("/categories");

      setCategories(data);
      setCategorySelected(data[0].id);
    } catch (error) {
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }

  async function fetchMarkets() {
    try {
      if (!categorySelected) return;

      const { data } = await api.get<TPlace[]>(
        "/markets/category/" + categorySelected
      );

      setMarkets(data);
    } catch (error) {
      Alert.alert("Categorias", "Não foi possível carregar os locais.");
    }
  }

  async function getCurrentLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    } catch (error) {
      Alert.alert("Localização", "Não foi possível pegar a localização atual.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [categorySelected]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray[200] }}>
      <Categories
        data={categories}
        categorySelected={categorySelected}
        onSelect={setCategorySelected}
      />
      {!loading && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            // latitude: location?.coords.latitude || locationDefault.latitude,
            // longitude: location?.coords.longitude || locationDefault.longitude,
            latitude: locationDefault.latitude,
            longitude: locationDefault.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            identifier="current-location"
            coordinate={{
              latitude: location?.coords.latitude || locationDefault.latitude,
              longitude:
                location?.coords.longitude || locationDefault.longitude,
            }}
            image={require("@/assets/location.png")}
          />
          {markets.map((item) => (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Image
                    source={{ uri: item.cover }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                  <View style={{ maxWidth: 150 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.gray[600],
                        fontFamily: fontFamily.medium,
                        maxWidth: 120,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: 12,
                        color: colors.gray[600],
                        fontFamily: fontFamily.regular,
                        maxWidth: 120,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.address}
                    </Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <Places data={markets} />
    </View>
  );
}
