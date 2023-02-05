import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  type?: "block" | "inline";
}>;

const hiddenStyles = {
  display: "inline-block",
  position: "absolute",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  border: 0,
} as const;

export default function VisuallyHidden({
  children,
  type = "inline",
  ...delegatedProps
}: Props) {
  return type === "inline" ? (
    <span style={hiddenStyles} {...delegatedProps}>
      {children}
    </span>
  ) : (
    <div style={hiddenStyles} {...delegatedProps}>
      {children}
    </div>
  );
}
