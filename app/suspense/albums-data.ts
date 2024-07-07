export const albumsData = async () => {
  // get the albums data from a database or API
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!process.env.IS_BUILDING) {
    if (Math.random() < 0.5) {
      throw new Error("Fake error: something went wrong");
    }
  }

  const albums = [];
  for (let i = 0; i < 10000; i++) {
    albums.push({
      id: i + 1,
      name: `Album ${i + 1}`,
      artist: `Artist ${i + 1}`,
      year: 2022 + i,
    });
  }

  return albums;
};

export type Album = {
  id: number;
  name: string;
  artist: string;
  year: number;
};
