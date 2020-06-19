import { Item } from "./Item";

export type User = {
  username: string;
  password: string;
  inventory: Item[];
};
export type AuthenticatedUser = {
  cookie: string;
  user: User;
};
