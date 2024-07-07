import { unstable_cache } from "next/cache";
import { cache } from "react";
import "server-only";

const allData = [
  {
    id: 1,
    name: `Album 1`,
    artist: `Artist 1`,
    year: 2022,
  },
  {
    id: 2,
    name: `Album 2`,
    artist: `Artist 2`,
    year: 2022,
  },
  {
    id: 3,
    name: `Album 3`,
    artist: `Artist 3`,
    year: 2022,
  },
];

const favorites = [
  {
    id: 1,
    userId: 1,
    dataId: 2,
  },
  {
    id: 2,
    userId: 2,
    dataId: 3,
  },
];

export const getAllData = unstable_cache(async () => {
  console.log(" getAllData");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return allData;
}, ["allData"]);

export const getFavoriteData = cache(async (userId: number) => {
  console.log(" getFavoriteData", userId);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return favorites.filter((favorite) => favorite.userId === userId);
});
