import { FlatList, View } from "react-native";
import { Category } from "./category-item";

export type TCategory = {
  id: string;
  name: string;
};

interface ICategoriesProps {
  data: TCategory[];
  categorySelected: string;
  onSelect: (id: string) => void;
}

export function Categories({
  data,
  categorySelected,
  onSelect,
}: ICategoriesProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 24 }}
      style={{ maxHeight: 36, position: "absolute", zIndex: 1, top: 64 }}
      renderItem={({ item }) => (
        <Category
          key={item.id}
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === categorySelected}
        />
      )}
    />
  );
}
