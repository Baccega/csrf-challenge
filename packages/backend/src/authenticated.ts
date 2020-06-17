export default async function authenticated(req: any, res: any, next: any) {
  req.username = "test";
  next();
}
