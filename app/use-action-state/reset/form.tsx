"use client";
import { useActionState, useRef, useState } from "react";
import { doSomething } from "./actions";

export default function Form() {
  const [state, submit, isPending] = useActionState(
    async (state: any, payload: FormData | null) => {
      if (!payload) {
        return null;
      }
      const data = await doSomething(state, payload);
      return data;
    },
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      id="theform"
      ref={formRef}
      className="flex flex-col items-center justify-start space-y-4 text-center p-4 w-full max-w-md bg-slate-50"
      action={submit}
    >
      {state && state.error && (
        <p className="bg-red-500 text-white p-4">{state.error}</p>
      )}
      <p>{state && state.data?.message}</p>
      <input
        disabled={isPending}
        className="border w-full border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        defaultValue={(state?.data?.name as string) || ""}
      />

      <div className="flex flex-row justify-between items-center w-full">
        <button
          type="button"
          onClick={() => {
            submit(null);
          }}
        >
          Reset
        </button>
        <button
          form="theform"
          disabled={isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-md disabled:bg-muted-foreground"
          type="submit"
        >
          {isPending ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
