"use client";

import { AuthResponseData } from "@/types/Strava";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { authenticate } from "../api/api";

const AUTH_TOKEN_KEY = "auth_token";
const EXPIRES_IN_KEY = "token_expires_in";

export const useStravaAuthQuery = (tokenExpired: boolean) =>
  useQuery<AuthResponseData>({
    queryKey: ["auth"],
    queryFn: authenticate,
    enabled: !!tokenExpired,
    refetchOnWindowFocus: false,
  });

export function useAuthTokenManager() {
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const {
    data: auth,
    error: authError,
    isLoading: authLoading,
  } = useStravaAuthQuery(isTokenExpired);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expirationTimestampStr = localStorage.getItem(EXPIRES_IN_KEY);

      if (!expirationTimestampStr) {
        setIsTokenExpired(true);
        return;
      }

      const expirationTimestamp = parseInt(expirationTimestampStr, 10);
      const now = Date.now();

      setIsTokenExpired(now > expirationTimestamp);
    };

    checkTokenExpiration();

    if (auth && getToken() !== auth.access_token) {
      setToken(auth.access_token, auth.expires_in);
    }
  }, [auth]);

  const localStorageAvailable = () => {
    return typeof window !== "undefined";
  };

  const setToken = (token: string, expiresIn: number) => {
    const expirationTimestamp = Date.now() + expiresIn * 1000;

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_IN_KEY, expirationTimestamp.toString());
    setIsTokenExpired(false);
  };

  const getToken = () => {
    return (
      (localStorageAvailable() &&
        window.localStorage.getItem(AUTH_TOKEN_KEY)) ||
      undefined
    );
  };

  const clearToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_IN_KEY);
    setIsTokenExpired(true);
  };

  return { isTokenExpired, setToken, getToken, clearToken };
}
