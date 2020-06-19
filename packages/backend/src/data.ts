import { AuthenticatedUser } from "@csrf-challenge/common/src/User";
import { User } from "@csrf-challenge/common/src";
import { createGary } from "./gary";

const dataRef: { users: User[]; authenticatedUsers: AuthenticatedUser[] } = {
  users: [createGary()],
  authenticatedUsers: [],
};

export default dataRef;
