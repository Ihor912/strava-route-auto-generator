"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
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

export const useActivitiesContext = (): ActivitiesContextType => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within a ActivitiesProvider");
  }
  return context;
};

const ActivitiesProvider = ({ children }: ActivitiesProviderProps) => {
  const [activities, dispatch] = useReducer(activitiesReducer, []);

  return (
    <ActivitiesContext.Provider value={{ activities, dispatch }}>
      {children}
    </ActivitiesContext.Provider>
  );
};

export { ActivitiesContext, ActivitiesProvider };
