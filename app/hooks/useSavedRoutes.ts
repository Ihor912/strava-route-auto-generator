import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SavedRoutesContext } from "../context/saved-routes-context";
import { ActivityResponse } from "@/types/Strava";
import polyline from "@mapbox/polyline";

export function useSavedRoutes() {
  // store routes in context and fetch new data only in case if it's empty.
  const { routes, setRoutes } = useContext(SavedRoutesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSavedRoutes() {
      try {
        const authResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/oauth/token?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET}&refresh_token=${process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`
        );
        if (authResponse.status !== 200) {
          throw new Error("Network response was not ok");
        }
        if (authResponse?.data && authResponse.data?.access_token) {
          const currentAthleteResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athlete?access_token=${authResponse.data.access_token}`
          );

          const { id } = currentAthleteResponse.data;
          if (!id) {
            throw new Error(
              "Error on retrieving the currently authenticated athlete"
            );
          }

          const routesResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athletes/${id}/routes?access_token=${authResponse.data.access_token}&per_page=200`
          );

          const routes = routesResponse.data as ActivityResponse[];

          setRoutes(
            routes.map((route) => ({
              id: route.id,
              name: route.name,
              positions: polyline.decode(route.map.summary_polyline),
            }))
          );
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    // use routes from the context if it's not empty.
    // In other case fetch routes from the API
    if (!routes.length) {
      fetchSavedRoutes();
    }
  }, []);

  return { routes, loading, error };
}
