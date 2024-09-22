"use server";

import { TweetProps } from "@/components/custom-tweet";
import { getTweetsFromDbOrSomething } from "./tweets";

export const getTweetsAction = async (
  prev: {
    hasMore: boolean;
    data: TweetProps[];
  },
  formData: FormData
) => {
  const lastId = parseInt(formData.get("lastId") as string) || 0;
  const { data: tweets, hasMore } = await getTweetsFromDbOrSomething(lastId);

  return {
    hasMore,
    data: prev.data.concat(tweets),
  };
};
