"use client";

import { useActivitiesFetching } from "@/app/hooks/useActivitiesFetching";
import { Activity } from "@/types/Strava";

export default function Page({ params }: { params: { id: number } }) {
  const { activities, loading, error } = useActivitiesFetching();
  const activity = activities.find((x: Activity) => x.id === Number(params.id));

  return <h1>My Activity {activity?.name}</h1>;
}
