import PageClient from "./page.client";

export default function Page() {
  return (
    <div className="flex flex-col max-w-lg w-full mx-auto">
      <h1>Use Transition</h1>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <PageClient index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
