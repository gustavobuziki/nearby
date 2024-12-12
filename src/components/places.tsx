import { useRef } from "react";
import { colors, fontFamily } from "@/styles/theme";
import { Text, useWindowDimensions } from "react-native";
import { Place, TPlace } from "./place";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

interface IPlacesProps {
  data: TPlace[];
}

export function Places({ data }: IPlacesProps) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = {
    min: 278,
    max: dimensions.height - 120,
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={{
        width: 80,
        height: 4,
        backgroundColor: colors.gray[300],
      }}
      backgroundStyle={{ backgroundColor: colors.gray[100] }}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        contentContainerStyle={{ gap: 12, padding: 24 }}
        ListHeaderComponent={() => (
          <Text
            style={{
              color: colors.gray[600],
              fontSize: 16,
              fontFamily: fontFamily.regular,
              marginBottom: 16,
            }}
          >
            Explore locais perto de você
          </Text>
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
      />
    </BottomSheet>
  );
}
