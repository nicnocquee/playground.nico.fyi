import "server-only";

import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { cache } from "react";

// fake users
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "user1@example.com",
    password: "user1",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "user2@example.com",
    password: "user2",
  },
];

const secretKey = process.env.JWT_SECRET || "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt<T extends JWTPayload>(payload: T) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 days from now")
    .sign(key);
}

type SessionType = {
  userId: string;
  expires: string;
};

export async function decrypt<T>(input: string): Promise<T> {
  const { payload } = await jwtVerify<T>(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt<SessionType>(session);
}

/**
 * This function always returns valid user if succeeds. Otherwise it will redirect to /
 */
export const checkSessionValid = cache(async () => {
  console.log(" checkSessionValid");
  const session = await getSession();
  if (!session || !session.userId || new Date() > new Date(session.expires)) {
    redirect("/cache/login");
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const user = users.find((user) => user.id === parseInt(session.userId));

  if (!user) {
    redirect("/");
  }
  return user;
});

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days, 24 hours, 60 minutes, 60 seconds, 1000 milliseconds
  const session = await encrypt<SessionType>({
    userId,
    expires: expires.toISOString(),
  });

  // Save the session in a cookie
  cookies().set("session", session, {
    expires,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production",
  });
}

export const destroySession = async () => {
  cookies().delete("session");
};

export async function updateSession(request?: NextRequest) {
  const theCookies = request?.cookies ?? cookies();
  const session = theCookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt<SessionType>(session);
  parsed.expires = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000
  ).toISOString();
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: new Date(parsed.expires),
  });
  return res;
}
