import Link from "next/link";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-start space-y-2 text-center p-4">
      <LoginForm />

      <Link href={`/cache/login`} className="underline">
        Return to cache demo
      </Link>
    </div>
  );
}
