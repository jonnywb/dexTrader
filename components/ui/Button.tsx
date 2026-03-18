import { Pressable, PressableProps, Text } from "react-native";

type ButtonProps = PressableProps & {
  label: string;
  className?: string;
  labelClassName?: string;
};

export function Button({ label, className, labelClassName, ...rest }: ButtonProps) {
  return (
    <Pressable
      {...rest}
      className={"rounded-xl bg-dexAccent px-4 py-4 items-center" + (className ? " " + className : "")}
    >
      <Text className={"font-mono text-black" + (labelClassName ? " " + labelClassName : "")}>{label}</Text>
    </Pressable>
  );
}
