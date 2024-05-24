"use client";

import { Activity } from "@/types/Strava";
import { useActivitiesFetching } from "../hooks/useActivitiesFetching";

export default function Page() {
  const { activities, loading, error } = useActivitiesFetching();
  return (
    <>
      <h1>Hello, Activities page!</h1>
      {activities.map((x: Activity) => x.name)}
    </>
  );
}
