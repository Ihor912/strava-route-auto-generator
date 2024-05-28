"use client";

import { ActivityResponse } from "@/types/Strava";
import { useEffect } from "react";
import { useActivitiesContext } from "../context/activities-context";
import { fetchActivities } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthTokenManager } from "./useAuthTokenManager";

export const useActivitiesQuery = (authToken: string | undefined) =>
  useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchActivities(authToken),
    enabled: !!authToken,
    refetchOnWindowFocus: false,
  });

export function useActivitiesFetching() {
  const { getToken } = useAuthTokenManager();
  const {
    data: newActivities,
    error: activitiesError,
    isLoading: activitiesLoading,
  } = useActivitiesQuery(getToken());
  // store activities in context reducer
  const { activities, dispatch } = useActivitiesContext();

  useEffect(() => {
    dispatch({
      type: "SET_ACTIVITIES",
      payload: (newActivities as ActivityResponse[]) || [],
    });
  }, [dispatch, newActivities]);

  return { activities, activitiesLoading, activitiesError };
}
