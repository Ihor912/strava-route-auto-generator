import { ActivityResponse } from "@/types/Strava";
import { useState, useEffect, useContext } from "react";
import { ActivitiesContext } from "../context/activities-context";
import axios from "axios";
import polyline from "@mapbox/polyline";

export function useActivities() {
  // store activities in context reducer and fetch new data only in case if it's empty.
  const { activities, dispatch } = useContext(ActivitiesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const authResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/oauth/token?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET}&refresh_token=${process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`
        );
        if (authResponse.status !== 200) {
          throw new Error("Network response was not ok");
        }
        if (authResponse?.data && authResponse.data?.access_token) {
          const activitiesResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athlete/activities?access_token=${authResponse.data.access_token}&per_page=200`
          );

          const activities = activitiesResponse.data as ActivityResponse[];
          dispatch({
            type: "SET_ACTIVITIES",
            payload: activities.map((activity) => ({
              id: activity.id,
              name: activity.name,
              positions: polyline.decode(activity.map.summary_polyline),
            })),
          });
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    // use activities from the context if it's not empty.
    // In other case fetch activities from the API
    if (!activities.length) {
      fetchActivities();
    }
  }, [dispatch]);

  return { activities, loading, error };
}
