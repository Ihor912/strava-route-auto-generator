"use client";

import { useSavedRoutes } from "../hooks/useSavedRoutes";

export default function Page() {
  const { routes, loading, error } = useSavedRoutes();
  return (
    <>
      <h1>Hello, Routes page!</h1>
      {routes.map((x) => x.name)}
    </>
  );
}
