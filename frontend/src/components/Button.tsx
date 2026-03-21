interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  text,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-rose-500 text-white py-2 rounded-lg 
      hover:bg-rose-600 transition"
    >
      {text}
    </button>
  );
}
