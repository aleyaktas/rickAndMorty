import { IStatus } from "./Card.interfaces";

export interface SearchBarProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter: (e: IStatus) => void;
  searchTerm: string;
  filter: IStatus;
}
