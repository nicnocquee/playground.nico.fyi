import Link from "next/link";
import { checkSessionValid } from "./session";
import { getAllData } from "./data-source";
import LogoutForm from "./logout-form";
import Favorites from "./favorites";
import { Suspense } from "react";

export default async function Page() {
  const user = await checkSessionValid();

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
              </li>
            ))}
          </ul>
        </div>
        <Suspense fallback={<div>Loading favorites...</div>}>
          <Favorites />
        </Suspense>
      </div>
    </div>
  );
}
