"use client";

import { useContext } from "react";
import { ActivitiesContext } from "@/app/context/activities-context";

export default function Page() {
  const { activities } = useContext(ActivitiesContext);
  return (
    <>
      <h1>Hello, Activities page!</h1>
      {activities.map((x) => x.name)}
    </>
  );
}
