"use client";

import { useSavedRoutesFetching } from "../hooks/useSavedRoutesFetching";

export default function Page() {
  const { routes, loading, error } = useSavedRoutesFetching();
  return (
    <>
      <h1>Hello, Routes page!</h1>
      {routes.map((x) => x.name)}
    </>
  );
}
