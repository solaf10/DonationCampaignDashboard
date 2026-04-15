import { Check } from "@mui/icons-material";
// import { useLocation } from "react-router-dom";

const StepperIcon = ({ active, completed, icon, stepIcons }) => {
  // const location = useLocation();
  // ✅ إذا الخطوة مكتملة → استخدم ✔️ الافتراضي
  if (completed) {
    return (
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "var(--main-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Check style={{ color: "#fff", fontSize: 18 }} />
      </div>
    );
  }

  // 🔹 active أو عادي
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: active ? "var(--main-color)" : "#e5e7eb",
        color: active ? "#fff" : "#9ca3af",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.3s",
      }}
    >
      {stepIcons[String(icon)]}
    </div>
  );
};
export default StepperIcon;
