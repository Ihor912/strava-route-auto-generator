"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
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

export const useSavedRoutesContext = (): SavedRoutesContextType => {
  const context = useContext(SavedRoutesContext);
  if (!context) {
    throw new Error(
      "useASavedRoutes must be used within a SavedRoutesProvider"
    );
  }
  return context;
};

const SavedRoutesProvider = ({ children }: SavedRoutesProviderProps) => {
  const [routes, dispatch] = useReducer(savedRoutesReducer, []);

  return (
    <SavedRoutesContext.Provider value={{ routes, dispatch }}>
      {children}
    </SavedRoutesContext.Provider>
  );
};

export { SavedRoutesContext, SavedRoutesProvider };
