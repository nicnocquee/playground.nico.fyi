"use client";

import { use, useActionState } from "react";
import { getTweetsFromDbOrSomething } from "./tweets";
import { CustomTweet } from "@/components/custom-tweet";
import { Button } from "@/components/ui/button";
import { getTweetsAction } from "./actions";

export default function Tweets({
  work,
}: {
  work: ReturnType<typeof getTweetsFromDbOrSomething>;
}) {
  const tweets = use(work);

  const [state, loadMore, isPending] = useActionState(getTweetsAction, tweets);

  const lastId = state.data.at(-1)?.id;

  return (
    <div className="space-y-2">
      {state.data.map((t) => {
        return <CustomTweet key={t.id} {...t} />;
      })}
      {state.hasMore ? (
        <form action={loadMore}>
          <input type="hidden" name="lastId" value={lastId} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
            variant={"outline"}
          >
            {isPending ? "Loading..." : "Load more"}
          </Button>
        </form>
      ) : null}
    </div>
  );
}
