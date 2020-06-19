import dataRef from "./data";
import { User } from "@csrf-challenge/common/src";

function findUser(cookie: any): User | null {
  const username = dataRef.authenticatedUsers.find(c => c.cookie === cookie)
    ?.username;
  const user = dataRef.users.find(u => u.username === username);

  return user || null;
}

export default async function authorized(req: any, res: any, next: any) {
  const foundUser = findUser(req.cookies?.sessionToken);

  if (Boolean(foundUser)) {
    req.user = foundUser;
    next();
  } else {
    res.status(403).send();
  }
}

export function verifyUser(username: string, password: string): User | null {
  const found = dataRef.users.find(
    u => u.username === username && u.password === password
  );
  return found || null;
}

export function logoutUser(user: any): boolean {
  dataRef.authenticatedUsers = dataRef.authenticatedUsers.filter(
    u => u.username !== user.username
  );
  return true;
}

export function loginUser(user: User | null, cookie: string): boolean {
  if (user !== null) {
    logoutUser(user);
    dataRef.authenticatedUsers = [
      ...dataRef.authenticatedUsers,
      { username: user?.username, cookie },
    ];
    return true;
  } else {
    return false;
  }
}
