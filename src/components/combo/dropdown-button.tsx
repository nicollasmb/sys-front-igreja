import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

interface SelectDropdownProps {
  options: string[];
  buttonLabel: string;
  onSelectOption: (selectedOption: string) => void;
}

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  buttonLabel,
  onSelectOption,
}) => {
  const handleOptionSelect = (option: string) => {
    onSelectOption(option);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full bg-marromclaro hover:text-gray-900 transition duration-200 hover:ring-marromclaro justify-center gap-x-1.5 rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:ring-2 ring-inset hover:bg-gray-50">
          {buttonLabel}
          {/* <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SelectDropdown;
