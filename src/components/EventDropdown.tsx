import React, { useState } from "react";
import { Events } from "@prisma/client";
const EventDropdown: React.FC<{ options: Array<Events> }> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState("Choose Event");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
};

const handleSelect = (option)=>{
    setActiveEvent(option.name);
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {activeEvent}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-fit min-w-[125px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => {
              return (
                <button
                  onClick={() => handleSelect(option)}
                  className="block w-full whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDropdown;
