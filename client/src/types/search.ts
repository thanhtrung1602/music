import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { User } from "~/types/user";
import { ITrack } from "./track";
export interface ISearchProps {
  search: IconDefinition;
}

export interface ISearch {
  users: User[];
  tracks: ITrack[]; 
}
