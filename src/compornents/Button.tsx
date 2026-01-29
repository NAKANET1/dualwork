import type { ReactNode } from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void | Promise<void>;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "gray" | "red";
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
};

function Button({
  label,
  onClick,
  size = "md",
  color = "blue",
  className = "",
  icon,
  disabled = false,
}: ButtonProps) {
  /** サイズ */
  const sizeClass =
    size === "sm" ? "px-6 py-1.5" : size === "lg" ? "px-18 py-3" : "px-8 py-2";

  /** 色 */
  const colorClass =
    color === "gray"
      ? "bg-gray-400 hover:bg-gray-500 text-white"
      : color === "red"
        ? "bg-red-500 hover:bg-red-700 text-white"
        : "bg-blue-500 hover:bg-blue-700 text-white";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        ${sizeClass}
        ${colorClass}
        rounded-md
        transition
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {icon && <span className="inline-flex items-center pr-3">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export default Button;
