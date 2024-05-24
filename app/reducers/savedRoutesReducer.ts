import { Activity } from "@/types/Strava";
import polyline from "@mapbox/polyline";

export const savedRoutesReducer = (
  state: SavedRouteState,
  action: SavedRouteAction
): SavedRouteState => {
  switch (action.type) {
    case "SET_SAVED_ROUTES":
      return action.payload.map((route) => ({
        id: route.id,
        name: route.name,
        positions: polyline.decode(route.map.summary_polyline),
      }));
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
