import { ComponentProps } from "react";

interface InputFieldProps extends ComponentProps<"input"> {
  label: string;
  span?: number;
  placeholder?: string; // Optional placeholder text
}

export function InputField({
  label,
  span,
  placeholder,
  ...props
}: InputFieldProps) {
  return (
    <div className={`col-span-${span}`}>
      <label
        htmlFor={props.id}
        className="block text-sm font-semibold leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <input
          {...props}
          autoComplete="organization"
          placeholder={placeholder} // Set the placeholder text
          className="block max-h-11 w-full border-r-0 border-l-0 border-t-0 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
