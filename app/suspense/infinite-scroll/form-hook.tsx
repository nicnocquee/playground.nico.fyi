"use client";

import { use } from "react";
import { getTweetsFromDbOrSomething } from "./tweets";
import { CustomTweet } from "@/components/custom-tweet";
import { Button } from "@/components/ui/button";
import { getTweetsAction } from "./actions";
import { useFormState, useFormStatus } from "react-dom";

export default function Tweets({
  work,
}: {
  work: ReturnType<typeof getTweetsFromDbOrSomething>;
}) {
  const tweets = use(work);

  const [state, loadMore] = useFormState(getTweetsAction, tweets);

  const lastId = state.data.at(-1)?.id;

  return (
    <div className="space-y-2">
      {state.data.map((t) => {
        return <CustomTweet key={t.id} {...t} />;
      })}
      {state.hasMore ? (
        <form action={loadMore}>
          <input type="hidden" name="lastId" value={lastId} />
          <FormButton />
        </form>
      ) : null}
    </div>
  );
}

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full"
      variant={"outline"}
    >
      {pending ? "Loading..." : "Load more"}
    </Button>
  );
};
