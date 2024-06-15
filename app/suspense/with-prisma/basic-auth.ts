import { headers } from "next/headers";

export const authorize = () => {
  const heads = headers();
  const basicAuth = heads.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    const validUser = process.env.BASIC_AUTH_USER;
    const validPassWord = process.env.BASIC_AUTH_PASSWORD;

    if (user === validUser && pwd === validPassWord) {
      return null;
    }
  }

  return Response.json(
    { error: "Unauthorized" },
    { headers: { "WWW-Authenticate": "Basic" }, status: 401 }
  );
};
