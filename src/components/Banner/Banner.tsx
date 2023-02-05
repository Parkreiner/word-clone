import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  status: "happy" | "sad";
}>;

export default function Banner({ status, children }: Props) {
  return (
    <div className={`banner ${status}`}>
      <p>{children}</p>
    </div>
  );
}
