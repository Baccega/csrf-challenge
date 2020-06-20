import moment from "moment";

export function verifyAntiCsrf(token: string, username: string): boolean {
  const decoded = Buffer.from(token, "base64").toString("utf-8");
  const splitted = decoded.split(";");
  const ago = moment().subtract(5, "minutes");
  const after = moment().add(5, "minutes");
  return (
    splitted.length === 2 &&
    splitted[0] === username &&
    moment(splitted[1]).isBetween(ago, after)
  );
}

export function createAntiCsrf(username: string) {
  const timestamp = Date.now();
  return Buffer.from(`${username};${timestamp}`).toString("base64");
}
