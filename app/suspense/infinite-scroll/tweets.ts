import { TweetProps } from "@/components/custom-tweet";
import "server-only";

export const MAX_TWEETS = 24;
export const PER_PAGE = 10;

export const getTweetsFromDbOrSomething = async (
  lastId: number
): Promise<{ data: TweetProps[]; hasMore: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (lastId >= MAX_TWEETS) {
    return { data: [], hasMore: false };
  }

  const tweets = [];
  let hasMore = true;
  for (let i = 0; i < PER_PAGE; i++) {
    if (lastId + i + 1 > MAX_TWEETS) {
      hasMore = false;
      break;
    }
    tweets.push({
      id: lastId + i + 1,
      name: `User ${lastId + i + 1}`,
      username: `user${lastId + i + 1}`,
      profileImage: `https://picsum.photos/200/200?random=${lastId + i + 1}`,
      content: `Tweet ${lastId + i + 1}`,
      timestamp: new Date().toISOString(),
      likes: Math.floor(Math.random() * 100),
      retweets: Math.floor(Math.random() * 100),
      replies: Math.floor(Math.random() * 100),
    });
  }

  return { data: tweets, hasMore };
};
