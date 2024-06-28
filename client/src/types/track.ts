import { User } from "~/types/user";
export interface ITrack {
  id: number;
  track_name: string;
  sound: string | null;
  image: string;
  description: string;
  user_id: number;
  category_id: number;
  genre_id: number;
  userData?: User;
  createdAt: Date;
}
