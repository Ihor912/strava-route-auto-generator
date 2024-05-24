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

interface ProductsProviderProps {
  children: ReactNode;
}

interface ActivitiesContextType {
  activities: ActivityState;
  dispatch: Dispatch<ActivityAction>;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

export const useActivities = (): ActivitiesContextType => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within a ActivitiesProvider");
  }
  return context;
};

const ActivitiesProvider = ({ children }: ProductsProviderProps) => {
  const [activities, dispatch] = useReducer(activitiesReducer, []);

  return (
    <ActivitiesContext.Provider value={{ activities, dispatch }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export { ActivitiesContext, ActivitiesProvider };
