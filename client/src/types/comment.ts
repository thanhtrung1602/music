import { IUser } from "./users";

export interface IComment {
  id: number;
  title: string;
  track_id: number;
  user_id: number;
  userData: IUser;
  createdAt: Date;
}
