import "server-only";
import fs from "fs/promises";
import { unstable_cache } from "next/cache";
import allData from "./all-data.json";

export const getAllData = unstable_cache(async () => {
  console.log(" getAllData");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return allData;
}, ["allData"]);

export const getFavoriteData = unstable_cache(
  async (userId: number) => {
    console.log(" getFavoriteData", userId);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const favorites = JSON.parse(
      (await fs.readFile("./app/cache/favorites.json", "utf8")) as any
    );
    return favorites.filter((favorite: any) => favorite.userId === userId);
  },
  ["favorites"],
  {
    tags: ["favorites"],
  }
);

export const toggleFavorite = async (userId: number, albumId: number) => {
  console.log(" toggleFavorite", userId, albumId);
  const favorites = JSON.parse(
    (await fs.readFile("./app/cache/favorites.json", "utf8")) as any
  );

  const index = favorites.findIndex(
    (favorite: any) => favorite.userId === userId && favorite.dataId === albumId
  );
  if (index === -1) {
    favorites.push({
      id: favorites.length + 1,
      userId,
      dataId: albumId,
    });
  } else {
    favorites.splice(index, 1);
  }
  await fs.writeFile("./app/cache/favorites.json", JSON.stringify(favorites));
  return favorites;
};

export const getGlobalData = unstable_cache(
  async () => {
    console.log(" getGlobalData");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      name: "Application Name",
      description: "This is application description",
      serverTime: new Date().toISOString(),
    };
  },
  ["globalData"],
  {
    tags: ["globalData"],
  }
);
