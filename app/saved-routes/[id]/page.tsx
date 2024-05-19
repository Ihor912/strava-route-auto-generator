"use client";

import { useSavedRoutes } from "@/app/hooks/useSavedRoutes";

export default function Page({ params }: { params: { id: number } }) {
  const { routes, loading, error } = useSavedRoutes();
  const route = routes.find((x) => x.id === Number(params.id));

  return <h1>My Saved Route {route?.name}</h1>;
}
