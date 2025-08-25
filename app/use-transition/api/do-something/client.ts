import { doSomething as doSomethingAction } from "../../action";

export const doSomething = async (
  ...args: Parameters<typeof doSomethingAction>
): Promise<ReturnType<typeof doSomethingAction>> => {
  const result = await fetch("/use-transition/api/do-something", {
    method: "POST",
    body: JSON.stringify(args),
  });
  return result.json();
};
