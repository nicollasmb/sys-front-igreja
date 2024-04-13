import React, { useState } from 'react';

const Selector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Católico');
  const dropdownItems = ['Católico'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); 
    console.log('Selecione a Religião:', option);
  };

  return (
    <div className="relative">
      <div className="text-sm font-medium leading-6 text-gray-900 mb-2">Religião</div> 
      <div className="flex items-center justify-between">
        <button
          className="block w-full border-r-0 border-l-0 border-t-0 border-1 transition duration-300
          hover:border-gray-950 hover:bg-slate-50 border-transparent focus:border-gray-950 
          focus:ring-0 border-gray-300 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 flex items-center"
          onClick={toggleDropdown}
        >
           <span className="ml-3">{selectedOption}</span>
          <svg
            className={`fill-current h-4 w-4 ml-auto ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
          </svg>
        </button>
      </div>
      <ul className={`absolute ${isOpen ? 'block' : 'hidden'} bg-white text-gray-800 pt-1 rounded-md shadow-md`}>
        {dropdownItems.map((item, index) => (
          <li key={index} onClick={() => handleSelectOption(item)} className="hover:bg-gray-200 py-2 px-4 cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
