"use client";

import { useState } from "react";
import { clearData, seedData } from "./action";

export default function Seed() {
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className="flex flex-col items-center justify-start space-y-2 text-center">
      <button
        disabled={isAdding}
        className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-md disabled:bg-muted-foreground"
        onClick={async () => {
          setIsAdding(true);
          await seedData();
          setIsAdding(false);
        }}
      >
        Add data
      </button>
      <button
        disabled={isDeleting}
        className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-md disabled:bg-muted-foreground"
        onClick={async () => {
          setIsDeleting(true);
          await clearData();
          setIsDeleting(false);
        }}
      >
        Delete data
      </button>
    </div>
  );
}
