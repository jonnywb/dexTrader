import { View, ViewProps } from "react-native";

export function Card(props: ViewProps) {
  return (
    <View
      {...props}
      className={
        "rounded-2xl bg-dexSurface border border-dexBorder p-4" + (props.className ? " " + props.className : "")
      }
    />
  );
}

export function ElevatedCard(props: ViewProps) {
  return (
    <View
      {...props}
      className={
        "rounded-2xl bg-dexSurfaceElevated border border-dexBorder p-4 shadow-lg" +
        (props.className ? " " + props.className : "")
      }
    />
  );
}
