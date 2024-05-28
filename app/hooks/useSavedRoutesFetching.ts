import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSavedRoutes, getCurrentAthlete } from "../api/api";
import { useAuthTokenManager } from "./useAuthTokenManager";
import { useSavedRoutesContext } from "../context/saved-routes-context";
import { ActivityResponse } from "@/types/Strava";

export const useCurrentAthleteQuery = (authToken: string | undefined) =>
  useQuery({
    queryKey: ["currentAthlete"],
    queryFn: () => getCurrentAthlete(authToken),
    enabled: !!authToken,
    refetchOnWindowFocus: false,
  });

export const useSavedRoutesQuery = (athleteId?: number, authToken?: string) =>
  useQuery({
    queryKey: ["savedRoutes"],
    queryFn: () => fetchSavedRoutes(athleteId, authToken),
    enabled: !!authToken && !!athleteId,
    refetchOnWindowFocus: false,
  });

export function useSavedRoutesFetching() {
  const { getToken } = useAuthTokenManager();
  const {
    data: currentUser,
    error: currentUserError,
    isLoading: currentUserLoading,
  } = useCurrentAthleteQuery(getToken());
  const {
    data: savedRoutes,
    error: savedRoutesError,
    isLoading: savedRoutesLoading,
  } = useSavedRoutesQuery(currentUser?.id, getToken());
  // store saved routes in context reducer.
  const { routes, dispatch } = useSavedRoutesContext();

  useEffect(() => {
    dispatch({
      type: "SET_SAVED_ROUTES",
      payload: (savedRoutes as ActivityResponse[]) || [],
    });
  }, [dispatch, savedRoutes]);

  return { routes, savedRoutesLoading, savedRoutesError };
}
