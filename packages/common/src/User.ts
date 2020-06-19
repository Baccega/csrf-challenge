export type User = {
  username: String;
  password: String;
  inventory: String;
};
export type AuthenticatedUser = {
  cookie: String;
  user: User;
};
