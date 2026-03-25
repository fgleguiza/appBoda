interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export default function Button({
  text,
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-[#b86b4b] text-white hover:bg-[#a35d3d]",
    secondary: "bg-[#e8d5c4] text-[#2c3e50] hover:bg-[#dfc5b3]",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 rounded-lg font-medium transition-colors ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </button>
  );
}
