import { Text, TextProps } from "react-native";

function merge(base: string, extra?: string) {
  return base + (extra ? " " + extra : "");
}

export function HeadingXL(props: TextProps) {
  return <Text {...props} className={merge("font-heading text-3xl text-dexText", props.className)} />;
}

export function HeadingSM(props: TextProps) {
  return <Text {...props} className={merge("font-body text-sm text-dexTextSecondary", props.className)} />;
}

export function Body(props: TextProps) {
  return <Text {...props} className={merge("font-body text-sm text-dexText", props.className)} />;
}

export function Mono(props: TextProps) {
  return <Text {...props} className={merge("font-mono text-sm text-dexText", props.className)} />;
}
