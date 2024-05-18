"use client";

import { ActivitiesContext } from "@/app/context/activities-context";
import { useContext, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const { activities } = useContext(ActivitiesContext);
  const activity = activities.find((x) => x.id === Number(params.id));

  return <h1>My Activity {activity?.name}</h1>;
}
