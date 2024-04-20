import { Field, useField, FieldProps } from "formik";
import { ComponentProps } from "react";

interface InputFieldProps extends ComponentProps<"input"> {
  label: string;
  span?: number;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  name: string; // Remove name from here
}

export function InputField({
  label,
  span,
  placeholder,
  minLength,
  maxLength,
  ...props
}: InputFieldProps) {
  const [field, meta] = useField(props.name); // Move useField here

  return (
    <div className={`col-span-${span}`}>
      <label
        htmlFor={props.name} // Use props.name here
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2.5">
        <Field name={props.name}>
          {({ field }: FieldProps) => (
            <>
              <input
                {...field}
                {...props}
                autoComplete="organization"
                placeholder={placeholder}
                className={`block w-full border-r-0 border-l-0 border-t-0 border-1 bg-gray-50 rounded transition duration-300
                hover:border-gray-950 hover:bg-slate-50 border-transparent focus:border-gray-950 
                focus:ring-0 border-gray-300 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 
                ${meta.touched && meta.error ? "border-red-800" : ""}`}
                minLength={minLength}
                maxLength={maxLength}
              />
              {meta.touched && meta.error && (
                <span className="text-sm text-red-700 absolute mt-1">
                  {meta.error}
                </span>
              )}
            </>
          )}
        </Field>
      </div>
    </div>
  );
}
