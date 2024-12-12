import { useRef } from "react";
import { colors, fontFamily } from "@/styles/theme";
import { Text, useWindowDimensions, View } from "react-native";
import { Place, TPlace } from "./place";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

// backgroundColor: colors.gray[100]

// gap: 12,
// padding: 24,
// paddingBottom: 100,

// width: 80,
// height: 4,
// backgroundColor: colors.gray[300];

// color: colors.gray[600]
// fontSize: 16,
// fontFamily: fontFamily.regular,
// marginBottom: 16

interface IPlacesProps {
  data: TPlace[];
}

export function Places({ data }: IPlacesProps) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={{ backgroundColor: colors.gray[100] }}
      backgroundStyle={{ backgroundColor: colors.gray[100] }}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        contentContainerStyle={{ gap: 12, padding: 24, paddingBottom: 100 }}
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
        renderItem={({ item }) => <Place data={item} />}
      />
    </BottomSheet>
  );
}
