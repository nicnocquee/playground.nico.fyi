import Link from "next/link";
import { checkSessionValid } from "./session";
import { getAllData } from "./data-source";
import LogoutForm from "./logout-form";
import Favorites from "./favorites";
import { Suspense } from "react";
import { FormButton } from "./form-button";
import { updateFavoriteAction } from "./favorite-action";
import { refreshFavoriteAction } from "./refresh-action";
import GlobalData from "./global-data";
import { refreshGlobalDataAction } from "./refresh-global-data-action";

export default async function Page() {
  console.log(`Page: /cache`);
  const user = await checkSessionValid();
  console.log(`Page: /cache`);
  const data = await getAllData();

  return (
    <div>
      <h1 className="text-xl font-bold">Cache Demo</h1>
      <div>
        <p>User: {user.name}</p>
        <LogoutForm />
      </div>
      <div className="grid h-[400px] w-[400px] grid-cols-2 gap-4 overflow-scroll bg-gray-100 p-4">
        <div>
          <h2>All Data</h2>
          <ul>
            {data.map((album) => (
              <li key={album.id}>
                <Link href={`/cache/album/${album.id}`}>{album.name}</Link>
                <FormButton
                  title="Add to favorites"
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
                    value={album.id}
                    className="hidden"
                  />
                </FormButton>
              </li>
            ))}
          </ul>
        </div>
        <Suspense fallback={<div>Loading favorites...</div>}>
          <Favorites />
        </Suspense>
      </div>
      <FormButton title="Refresh Favorites" action={refreshFavoriteAction} />
      <Suspense fallback={<div>Loading global data...</div>}>
        <GlobalData />
      </Suspense>
      <FormButton
        title="Refresh Global Data"
        action={refreshGlobalDataAction}
      />
    </div>
  );
}
