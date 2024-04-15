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
}

const SelectField: React.FC<Props> = ({ name, label, options }) => {
  const [field, , helpers] = useField(name);
  const [selectedOption, setSelectedOption] = useState(
    field.value || options[0].value
  );
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
    setSelectedOption(selectedOptionLabel || options[0].label);
  }, [field.value, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option.value);
    helpers.setValue(option.value);
    setIsOpen(false);
    console.log("Selected option:", option);
  };

  return (
    <div className="" ref={selectRef}>
      <div className="text-sm font-medium leading-6 text-gray-900 mb-2">
        {label}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="flex w-full border-r-0 border-l-0 border-t-0 border-1 transition duration-300
          hover:border-gray-950 hover:bg-slate-50 border-transparent focus:border-gray-950 
          focus:ring-0 border-gray-300 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 items-center"
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
    </div>
  );
};

export default SelectField;
