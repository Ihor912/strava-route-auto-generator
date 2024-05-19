"use client";

import { Route } from "@/types/Strava";
import { createContext, useState } from "react";

const SavedRoutesContext = createContext<{
  routes: Route[];
  setRoutes: (routes: Route[]) => void;
}>();

const SavedRoutesProvider = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  return (
    <SavedRoutesContext.Provider value={{ routes, setRoutes }}>
      {children}
    </SavedRoutesContext.Provider>
  );
};

export { SavedRoutesContext, SavedRoutesProvider };
