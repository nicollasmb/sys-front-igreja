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
          className={`flex py-2 w-full rounded-md border-0 hover:bg-slate-50 transition duration-100 focus:bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-marromclaro sm:text-sm sm:leading-6
          ${meta.touched && meta.error ? "ring-1 ring-red-800" : ""}`}
          onClick={toggleDropdown}
          type="button"
        >
          <span className="ml-3">{selectedOption}</span>
          <svg
            className={`h-4 w-4 ml-auto mt-1 ${isOpen ? "rotate-180" : ""}`}
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
