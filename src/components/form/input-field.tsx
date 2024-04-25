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
                className={`block w-full rounded-md border-0 hover:bg-slate-50 transition duration-300 focus:bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-marromclaro sm:text-sm sm:leading-6
                ${meta.touched && meta.error ? "ring-1 ring-red-800" : ""}`}
                minLength={minLength}
                maxLength={maxLength}
              />
              {meta.touched && meta.error && (
                <span className="sm:text-xs md:text-sm text-red-700 absolute mt-1">
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
