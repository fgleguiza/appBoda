interface ButtonProps {
  text: string
  onClick: () => void
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-rose-500 text-white py-2 rounded-lg 
      hover:bg-rose-600 transition"
    >
      {text}
    </button>
  )
}