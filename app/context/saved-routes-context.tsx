"use client";

import { Route } from "@/types/Strava";
import {
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
  useState,
} from "react";
import {
  SavedRouteAction,
  SavedRouteState,
  savedRoutesReducer,
} from "../reducers/savedRoutesReducer";

interface SavedRoutesProviderProps {
  children: ReactNode;
}

interface SavedRoutesContextType {
  routes: SavedRouteState;
  dispatch: Dispatch<SavedRouteAction>;
}

const SavedRoutesContext = createContext<SavedRoutesContextType | undefined>(
  undefined
);

const SavedRoutesProvider = ({ children }: SavedRoutesProviderProps) => {
  const [routes, dispatch] = useReducer(savedRoutesReducer, []);

  return (
    <SavedRoutesContext.Provider value={{ routes, dispatch }}>
      {children}
    </SavedRoutesContext.Provider>
  );
};

export { SavedRoutesContext, SavedRoutesProvider };
