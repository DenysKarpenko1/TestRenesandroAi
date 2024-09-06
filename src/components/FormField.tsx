import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      {children}
    </label>
  );
}
