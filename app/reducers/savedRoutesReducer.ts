import { Activity } from "@/types/Strava";

export const savedRoutesReducer = (
  state: SavedRouteState,
  action: SavedRouteAction
): SavedRouteState => {
  switch (action.type) {
    case "SET_SAVED_ROUTES":
      return action.payload;
    case "ADD_SAVED_ROUTE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export interface SavedRouteState extends Array<Activity> {}

export type SavedRouteAction =
  | { type: "SET_SAVED_ROUTES"; payload: Activity[] }
  | { type: "ADD_SAVED_ROUTE"; payload: Activity }; // to implement
