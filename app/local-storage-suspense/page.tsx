import { headers } from "next/headers";
import { LocalStorageDemo } from "./page.client";

export default function LocalStoragePage() {
  headers();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <LocalStorageDemo />
    </div>
  );
}
