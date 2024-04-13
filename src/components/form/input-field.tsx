import { Field, FieldProps } from "formik";
import { ComponentProps } from "react";

interface InputFieldProps extends ComponentProps<"input"> {
  label: string;
  name: string;
  span?: number;
  placeholder?: string;
}

export function InputField({
  label,
  name,
  span,
  placeholder,
  ...props
}: InputFieldProps) {
  return (
    <div className={`col-span-${span}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <Field name={name}>
          {({ field, form }: FieldProps) => (
            <input
              {...field}
              {...props}
              autoComplete="organization"
              placeholder={placeholder}
              className="block w-full border-r-0 border-l-0 border-t-0 border-1 transition duration-300
               hover:border-gray-950 hover:bg-slate-50 border-transparent focus:border-gray-950 
               focus:ring-0 border-gray-300 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          )}
        </Field>
      </div>
    </div>
  );
}
