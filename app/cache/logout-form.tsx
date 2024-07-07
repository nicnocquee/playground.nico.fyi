"use client";

import { useFormStatus } from "react-dom";
import { logout } from "./auth-action";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <LogoutFormContent />
    </form>
  );
}

export const LogoutFormContent = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        disabled={pending}
        type="submit"
        form="logout-form"
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </>
  );
};
