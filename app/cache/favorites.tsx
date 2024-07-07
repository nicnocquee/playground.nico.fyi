import Link from "next/link";
import { getAllData, getFavoriteData } from "./data-source";
import { checkSessionValid } from "./session";

export default async function Favorites() {
  const user = await checkSessionValid();
  const [data, favorites] = await Promise.all([
    getAllData(),
    getFavoriteData(user.id),
  ]);
  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <Link href={`/cache/album/${favorite.dataId}`}>
              {data.find((album) => album.id === favorite.dataId)?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
