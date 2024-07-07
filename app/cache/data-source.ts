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

export const getAllData = async () => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
  return allData;
};

export const getFavoriteData = async (userId: number) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
  return favorites.filter((favorite) => favorite.userId === userId);
};
