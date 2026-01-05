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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "1.5rem",
        zIndex: 1000,
      }}
    >
      Loading...
    </div>
  );
};
