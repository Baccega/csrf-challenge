import { Message, Login } from "./index";
import { LoginResponse } from "./Login";
import { Item, SendItem } from "./Item";

export type ResponseStatus<T = null, E extends string = string> =
  | { status: "ok"; data: T; error: null }
  | { status: "error"; data: null; error: E };

type AntiCsrfToken = {
  token: string;
};

export default interface Endpoints {
  "POST /login": {
    params: {};
    res: ResponseStatus<LoginResponse>;
    req: Login;
  };
  "POST /signup": {
    params: {};
    res: ResponseStatus<LoginResponse>;
    req: Login;
  };
  "POST /logout": {
    params: {};
    res: ResponseStatus<any>;
    req: any;
  };
  "POST /chat": {
    params: {};
    res: ResponseStatus<Message>;
    req: Message;
  };
  "GET /inventory": {
    params: {};
    res: ResponseStatus<Item[]>;
    req: any;
  };
  "GET /send": {
    params: {};
    res: ResponseStatus<AntiCsrfToken>;
    req: any;
  };
  "POST /send": {
    params: {};
    res: ResponseStatus<any>;
    req: SendItem;
  };
}
