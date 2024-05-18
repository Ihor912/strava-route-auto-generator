import { ActivityResponse } from "@/types/Strava";
import { useState, useEffect, useContext } from "react";
import { ActivitiesContext } from "../context/activities-context";
import axios from "axios";
import polyline from "@mapbox/polyline";

const API_BASE_URL = "https://www.strava.com";

export function useActivities() {
  // store activities in context and fetch new data only in case if it's empty.
  const { activities, setActivities } = useContext(ActivitiesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const authResponse = await axios.post(
          `${API_BASE_URL}/oauth/token?client_id=109159&client_secret=57955245359f41f9f56b7bd805bf1054f8000942&refresh_token=31c2709a9c4a06b1f10455527a8267adf0511d38&grant_type=refresh_token`
        );
        if (authResponse.status !== 200) {
          throw new Error("Network response was not ok");
        }
        if (authResponse?.data && authResponse.data?.access_token) {
          const activitiesResponse = await axios.get(
            `${API_BASE_URL}/api/v3/athlete/activities?access_token=${authResponse.data.access_token}&per_page=200`
          );

          const activities = activitiesResponse.data as ActivityResponse[];

          setActivities(
            activities.map((activity) => ({
              id: activity.id,
              name: activity.name,
              positions: polyline.decode(activity.map.summary_polyline),
            }))
          );
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
  }, []);

  return { activities, loading, error };
}
