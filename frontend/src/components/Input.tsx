import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="border border-gray-300 rounded-lg px-3 py-2 
        focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
