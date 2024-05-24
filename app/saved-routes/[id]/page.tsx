"use client";

import { useSavedRoutesFetching } from "@/app/hooks/useSavedRoutesFetching";

export default function Page({ params }: { params: { id: number } }) {
  const { routes, loading, error } = useSavedRoutesFetching();
  const route = routes.find((x) => x.id === Number(params.id));

  return <h1>My Saved Route {route?.name}</h1>;
}
