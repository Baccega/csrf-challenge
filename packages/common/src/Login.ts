export default interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  cookie: string;
  expires: string;
}
