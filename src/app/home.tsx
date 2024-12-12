import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { api } from "@/services/api";
import { Categories, TCategory } from "@/components/categories";
import { TPlace } from "@/components/place";
import { Places } from "@/components/places";

export default function Home() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [markets, setMarkets] = useState<TPlace[]>([]);
  const [categorySelected, setCategorySelected] = useState("");

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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [categorySelected]);

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        categorySelected={categorySelected}
        onSelect={setCategorySelected}
      />
      <Places data={markets} />
    </View>
  );
}
