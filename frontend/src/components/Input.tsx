import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
  required,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-medium text-[#2c3e50]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="border border-[#e8d5c4] rounded-lg px-4 py-2 bg-white text-gray-700
        focus:outline-none focus:ring-2 focus:ring-[#b86b4b] focus:border-transparent
        transition-all"
      />

      {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
    </div>
  );
}
