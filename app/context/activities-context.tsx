"use client";

import { Activity } from "@/types/Strava";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import {
  ActivityAction,
  ActivityState,
  activitiesReducer,
} from "../reducers/activitiesReducer";

interface ActivitiesProviderProps {
  children: ReactNode;
}

interface ActivitiesContextType {
  activities: ActivityState;
  dispatch: Dispatch<ActivityAction>;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

const ActivitiesProvider = ({ children }: ActivitiesProviderProps) => {
  const [activities, dispatch] = useReducer(activitiesReducer, []);

  return (
    <ActivitiesContext.Provider value={{ activities, dispatch }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export { ActivitiesContext, ActivitiesProvider };
