"use client";

import { useActivities } from "@/app/hooks/useActivities";

export default function Page({ params }: { params: { id: number } }) {
  const { activities, loading, error } = useActivities();
  const activity = activities.find((x) => x.id === Number(params.id));

  return <h1>My Activity {activity?.name}</h1>;
}
