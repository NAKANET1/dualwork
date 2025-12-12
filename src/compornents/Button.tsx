type ButtonProps = {
  label: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "gray" | "red";
  className?: string;
};

function Button({
  label,
  onClick,
  size = "md",
  color = "blue",
  className = "",
}: ButtonProps) {
  // ▼ サイズ別クラス
  const sizeClass =
    size === "sm"
      ? "px-6 py-1.5"
      : size === "lg"
      ? "px-18 py-3"
      : "px-8 py-2";

  // ▼ 色別クラス
  const colorClass =
    color === "gray"
      ? "bg-gray-400 hover:bg-gray-500 text-white"
      : color === "red"
      ? "bg-red-500 hover:bg-red-700 text-white"
      : "bg-blue-500 hover:bg-blue-700 text-white";

  return (
    <button
      onClick={onClick}
      className={`${sizeClass} ${colorClass} rounded-full transition ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;