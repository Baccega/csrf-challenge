export default interface Login {
  username: String;
  password: String;
}

export interface LoginResponse {
  cookie: String;
  expires: string;
}
