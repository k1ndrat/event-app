import type { FC } from "react";
import { LoaderPinwheel } from "lucide-react";

type TProps = {
  isVisible: boolean;
};

export const Loader: FC<TProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <LoaderPinwheel className="size-12 animate-spin" />
    </div>
  );
};
