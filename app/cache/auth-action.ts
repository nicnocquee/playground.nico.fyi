"use server";
import { redirect } from "next/navigation";
import { createSession, destroySession, updateSession, users } from "./session";

export const authenticate = async (_prevState: any, formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  const user = users.find(
    (user) => user.email === username && user.password === password
  );
  if (user) {
    await createSession(`${user.id}`);
    redirect("/cache");
  }

  return {
    data: null,
    error: "Invalid username or password",
  };
};

export const logout = async (_prevState: any) => {
  await destroySession();
  redirect("/cache");
};
