import { use } from "react";
import { redirect } from "next/navigation";

const RedirectToLogin = ({
  work,
  loginURL = `/`,
}: {
  work: Promise<any>;
  loginURL?: string;
}) => {
  const data = use(work);

  redirect(loginURL);
};

export default RedirectToLogin;
