import { Suspense } from "react";
import SearchParamsDemo from "./page.client";

export default function WhatPage() {
  return (
    <Suspense>
      <SearchParamsDemo />
    </Suspense>
  );
}
