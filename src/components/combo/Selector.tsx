import React, { useState, useEffect, useRef } from "react";
import { useField } from "formik";

interface Option {
  value: string | boolean;
  label: string;
}

interface Props {
  name: string;
  label: string;
  options: Option[];
  additionalLabel?: string;
}

const SelectField: React.FC<Props> = ({
  name,
  label,
  options,
  additionalLabel,
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedOption, setSelectedOption] = useState(field.value || "");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOption(field.value);
  }, [field.value]);

  useEffect(() => {
    const selectedOptionLabel = options.find(
      (option) => option.value === field.value
    )?.label;
    setSelectedOption(selectedOptionLabel || "Selecione");
  }, [field.value, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option.label);
    helpers.setValue(option.value);
    setIsOpen(false);
    console.log("Selected option:", option);
  };

  return (
    <div className="" ref={selectRef}>
      <div className="text-sm font-medium leading-6 text-gray-900 mb-2">
        {label}
        <br />
        {additionalLabel && (
          <span className="md:hidden text-xs text-gray-600 -mt-2">
            ({additionalLabel})
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`flex w-full border-transparent rounded-md bg-gray-50 transition duration-300 hover:bg-slate-50 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 items-center ${
            meta.touched && meta.error ? "border border-red-800" : ""
          }`}
          onClick={toggleDropdown}
        >
          <span className="ml-3">{selectedOption}</span>
          <svg
            className={`fill-current h-4 w-4 ml-auto ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
          </svg>
        </button>
      </div>

      <ul
        className={`absolute ${
          isOpen ? "block" : "hidden"
        } bg-white text-gray-800 rounded-md shadow-md w-48`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelectOption(option)}
            className="hover:bg-gray-200 py-2 px-4 cursor-pointer text-sm"
          >
            {option.label}
          </li>
        ))}
      </ul>

      {/* Conditionally render error message */}
      {meta.touched && meta.error && (
        <span className="text-sm text-red-700 mt-1">{meta.error}</span>
      )}
    </div>
  );
};

export default SelectField;
