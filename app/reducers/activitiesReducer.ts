import { Activity } from "@/types/Strava";
import polyline from "@mapbox/polyline";

export const activitiesReducer = (
  state: ActivityState,
  action: ActivityAction
): ActivityState => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return action.payload.map((route) => ({
        id: route.id,
        name: route.name,
        positions: polyline.decode(route.map.summary_polyline),
      }));
    case "ADD_ACTIVITY":
      return [...state, action.payload];
    default:
      return state;
  }
};

export interface ActivityState extends Array<Activity> {}

export type ActivityAction =
  | { type: "SET_ACTIVITIES"; payload: Activity[] }
  | { type: "ADD_ACTIVITY"; payload: Activity }; // to implement
