import Logo from "@/assets/logo.svg";
import { StyleProp, View, ViewStyle } from "react-native";

type HeaderLogoProps = {
  width?: number;
  height?: number;
  containerClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function HeaderLogo({ width = 240, height = 80, containerClassName = "", containerStyle }: HeaderLogoProps) {
  return (
    <View className={`justify-center ${containerClassName}`} style={containerStyle}>
      <Logo width={width} height={height} />
    </View>
  );
}
