export interface CardProps {
  id: string;
  image: string;
  name: string;
  status: IStatus;
  handleClick: () => void;
}

export enum IStatus {
  all = "All",
  dead = "Dead",
  alive = "Alive",
  unknown = "Unknown",
}
