import React from "react";
import { Status } from "./Card";

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
    <div className="flex m-auto mt-5 px-10 w-1/2">
      <input
        className=" flex-grow mr-3 p-3 rounded-md border text-base"
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={onSearch}
      />
      <select
        className="p-3 rounded-md border text-base min-w-filter"
        value={filter}
        onChange={onFilter}
      >
        {Object.entries(Status).map(([key, value]) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
