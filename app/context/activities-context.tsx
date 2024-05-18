"use client";

import { Activity } from "@/types/Strava";
import { createContext, useState } from "react";

const ActivitiesContext = createContext<{
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}>();

const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export { ActivitiesContext, ActivitiesProvider };
