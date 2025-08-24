import { headers } from "next/headers";
import { LocalStorageDemo } from "./page.client";

export default async function LocalStoragePage() {
  await headers();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <LocalStorageDemo />
    </div>
  );
}
