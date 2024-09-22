"use client";

import { Suspense, use } from "react";

export default function Client() {
  return (
    <div>
      <h1 className="text-xl font-bold">Client Demo</h1>
      <div className="grid h-[400px] w-[400px] grid-cols-2 gap-4 overflow-scroll bg-gray-100 p-4">
        <Suspense fallback={<div>Waiting for fake promise...</div>}>
          <DataComponent
            promise={
              new Promise<string>((resolve) =>
                setTimeout(() => {
                  resolve("Hello");
                }, 2000)
              )
            }
          />
        </Suspense>
      </div>
    </div>
  );
}

const DataComponent = ({ promise }: { promise: Promise<any> }) => {
  const data = use(promise);

  return <div>{data}</div>;
};
