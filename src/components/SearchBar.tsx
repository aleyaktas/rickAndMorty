import React from "react";
import { Status } from "./Card";
import Down from "../assets/images/Down.svg";

interface SearchBarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchTerm: string;
  filter: string;
}

const SearchBar = ({
  onSearch,
  searchTerm,
  filter,
  onFilter,
}: SearchBarProps) => {
  return (
    <div className="flex justify-center mx-auto mt-5 px-10 w-1/2">
      <input
        className="flex-grow mr-3 p-3 rounded-md border text-xs md:text-base focus:outline-primaryText"
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={onSearch}
      />
      <div className="relative">
        <select
          className="p-3 rounded-md border text-xs md:text-base md:min-w-filter appearance-none pr-10 focus:outline-primaryText"
          value={filter}
          onChange={onFilter}
        >
          {Object.entries(Status).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <img className="fill-current h-4 w-4" src={Down} alt="Down" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
