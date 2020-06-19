import dataRef from "./data";
import { User } from "@csrf-challenge/common/src";

function findUser(cookie: any): User | null {
  const user = dataRef.authenticatedUsers.find(c => c.cookie === cookie);

  return user?.user || null;
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
  console.log(JSON.stringify(user, null, 2));
  dataRef.authenticatedUsers = dataRef.authenticatedUsers.filter(
    u => u.user.username !== user.username
  );
  return true;
}

export function loginUser(user: User | null, cookie: string): boolean {
  if (user !== null) {
    logoutUser(user);
    dataRef.authenticatedUsers = [
      ...dataRef.authenticatedUsers,
      { user, cookie },
    ];
    return true;
  } else {
    return false;
  }
}
