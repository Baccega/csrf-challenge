import { User } from "@csrf-challenge/common/src";

declare namespace Express {
  interface Request {
    user?: User;
  }
}
