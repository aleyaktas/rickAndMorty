import { IStatus } from "./Card.interfaces";

export interface IEpisode {
  name: string;
  episode: string;
  air_date: string;
}

export interface ILocation {
  name: string;
}

export interface IOrigin {
  name: string;
}

export interface IDetailsData {
  image: string;
  name: string;
  status: IStatus;
  species: string;
  gender: string;
  episode: IEpisode[];
  location: ILocation;
  origin: IOrigin;
}
