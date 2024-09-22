import { getTweetsFromDbOrSomething } from "./tweets";
import Tweets from "./page.client";
import { Suspense } from "react";

export default async function Page() {
  const tweets = getTweetsFromDbOrSomething(0);
  return (
    <div className="mx-auto max-w-md w-full p-4">
      <h1 className="text-xl font-bold">Infinite Scroll Demo</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Tweets work={tweets} />
      </Suspense>
    </div>
  );
}
