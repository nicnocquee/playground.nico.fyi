"use client";
import { useRef } from "react";
import { doSomething } from "./actions";
import { useResettableActionState } from "use-resettable-action-state";
import { useGoogleReCaptcha } from "@wojtekmaj/react-recaptcha-v3";

export default function Form() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [state, submit, isPending, reset, payload] = useResettableActionState(
    doSomething,
    null,
    undefined,
    async (payload, abortController) => {
      const token = await executeRecaptcha?.("doSomething");
      if (!token) {
        abortController.abort({
          error: "reCAPTCHA verification failed",
        });
        return payload;
      }
      payload?.set("token", token);
      return payload;
    }
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      id="theform"
      ref={formRef}
      className="flex flex-col items-center justify-start space-y-4 text-center p-4 w-full max-w-md bg-slate-50"
      action={submit}
    >
      {!isPending && state && state.error && (
        <p className="bg-red-500 text-white p-4">{state.error}</p>
      )}
      <pre className="text-sm text-muted-foreground text-left">
        {!isPending &&
          state &&
          JSON.stringify(state.data?.recaptchaResponse, null, 2)}
      </pre>
      <input
        required
        disabled={isPending}
        className="border w-full border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        defaultValue={(payload?.get("name") as string) || ""}
      />
      <input type="hidden" name="token" value="" />

      <div className="flex flex-row justify-between items-center w-full">
        <button
          type="button"
          onClick={() => {
            reset();
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
      {isPending && (
        <p className="text-sm text-muted-foreground">
          (3s delay in doSomething action)
        </p>
      )}
    </form>
  );
}
