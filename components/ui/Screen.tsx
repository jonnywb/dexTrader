import { View, ViewProps } from "react-native";

type ScreenProps = ViewProps & { className?: string };

export function Screen({ className, children, ...rest }: ScreenProps) {
  return (
    <View {...rest} className={"flex-1 bg-dexBg px-4 pt-12" + (className ? " " + className : "")}>
      {children}
    </View>
  );
}
