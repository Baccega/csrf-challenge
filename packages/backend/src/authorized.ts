import dataRef from "./data";
import { User } from "@csrf-challenge/common/src";

function findUser(cookies: any): User | null {
  const user = dataRef.authenticatedUsers.find(c => c.cookie === cookies);

  // return authenticatedUser?.user || false;
  return user?.user || null;
}

export default async function authorized(req: any, res: any, next: any) {
  console.log(JSON.stringify(req.cookies, null, 2));
  // const foundUser = findUser(req.cookies); TODO
  const foundUser = dataRef.users.find(u => u.username === "gary");
  console.log("found: " + JSON.stringify(foundUser, null, 2));

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
  console.log("AuthenticatedUsersAfterLogout:", dataRef.authenticatedUsers);
  return true;
}

export function loginUser(user: User | null, cookie: string): boolean {
  if (user !== null) {
    logoutUser(user);
    dataRef.authenticatedUsers = [
      ...dataRef.authenticatedUsers,
      { user, cookie },
    ];
    console.log("AuthenticatedUsers:", dataRef.authenticatedUsers);
    return true;
  } else {
    return false;
  }
}
