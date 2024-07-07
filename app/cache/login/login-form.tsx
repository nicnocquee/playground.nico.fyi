"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../auth-action";

export default function LoginForm() {
  const [state, submit] = useFormState(authenticate, null);

  return (
    <form
      id="login-form"
      action={submit}
      className="flex flex-col items-center justify-start space-y-2 text-center p-4"
    >
      {state?.error && (
        <p className="bg-red-500 text-white p-4">{state.error}</p>
      )}
      <LoginFormContent />
    </form>
  );
}

const LoginFormContent = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <label htmlFor="username">E-mail</label>
      <input
        disabled={pending}
        type="text"
        name="username"
        id="username"
        className="border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <label htmlFor="password">Password</label>
      <input
        disabled={pending}
        type="password"
        name="password"
        id="password"
        className="border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        disabled={pending}
        type="submit"
        form="login-form"
        className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-md disabled:bg-muted-foreground"
      >
        Login
      </button>
    </>
  );
};
