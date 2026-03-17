interface InputProps {
  label: string
  type?: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function Input({
  label,
  type = "text",
  value,
  placeholder,
  onChange
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 
        focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

    </div>
  )
}