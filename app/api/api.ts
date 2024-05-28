"use client";

import axios from "axios";
import { ActivityResponse, Athlete, AuthResponseData } from "@/types/Strava";

const authenticate = async (): Promise<AuthResponseData> => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/oauth/token?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET}&refresh_token=${process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`
  );
  return data;
};

const fetchActivities = async (
  access_token?: string
): Promise<ActivityResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athlete/activities?access_token=${access_token}&per_page=200`
  );
  return data;
};

const getCurrentAthlete = async (access_token?: string): Promise<Athlete> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athlete?access_token=${access_token}`
  );
  return data;
};

const fetchSavedRoutes = async (
  athleteId?: number,
  access_token?: string
): Promise<ActivityResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_STRAVA_API_BASE_URL}/api/v3/athletes/${athleteId}/routes?access_token=${access_token}&per_page=200`
  );
  return data;
};

export { authenticate, fetchActivities, getCurrentAthlete, fetchSavedRoutes };
