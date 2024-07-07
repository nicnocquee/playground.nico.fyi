import Link from "next/link";
import { getAllData, getFavoriteData } from "./data-source";
import { checkSessionValid } from "./session";
import { FormButton } from "./form-button";
import { updateFavoriteAction } from "./favorite-action";

export default async function Favorites() {
  console.log(`RSC: favorites.tsx`);
  const user = await checkSessionValid();
  console.log(`RSC: favorites.tsx`);
  const [data, favorites] = await Promise.all([
    getAllData(),
    getFavoriteData(user.id),
  ]);
  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite: any) => (
          <li key={favorite.id}>
            <Link href={`/cache/album/${favorite.dataId}`}>
              {data.find((album) => album.id === favorite.dataId)?.name}
            </Link>
            <FormButton
              title="Remove from favorites"
              action={updateFavoriteAction}
            >
              <input
                type="hidden"
                name="userId"
                value={user.id}
                className="hidden"
              />
              <input
                type="hidden"
                name="albumId"
                value={favorite.dataId}
                className="hidden"
              />
            </FormButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
