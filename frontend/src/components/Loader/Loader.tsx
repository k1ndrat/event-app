import { Spinner } from "../ui/spinner";

export const Loader = ({ isVisible }: { isVisible: boolean }) => {
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
      <Spinner className="size-12 text-purple-500" />
    </div>
  );
};
