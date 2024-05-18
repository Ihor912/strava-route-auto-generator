"use client";

import { useActivities } from "../hooks/useActivities";

export default function Page() {
  const { activities, loading, error } = useActivities();
  return (
    <>
      <h1>Hello, Activities page!</h1>
      {activities.map((x) => x.name)}
    </>
  );
}
