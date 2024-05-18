"use client";

import dynamic from "next/dynamic";

import axios from "axios";
import polyline from "@mapbox/polyline";
import { useContext, useEffect, useState } from "react";
import { ActivityResponse } from "@/types/Strava";
import { ActivitiesContext } from "./context/activities-context";

const LazyMap = dynamic(() => import("@/app/ui/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const { activities, setActivities } = useContext(ActivitiesContext);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | []>(
    []
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    }

    async function fetchData() {
      const authResult = await axios.post(
        `https://www.strava.com/oauth/token?client_id=109159&client_secret=57955245359f41f9f56b7bd805bf1054f8000942&refresh_token=31c2709a9c4a06b1f10455527a8267adf0511d38&grant_type=refresh_token`
      );
      if (authResult?.data && authResult.data?.access_token) {
        const activitiesResponse = await axios.get(
          `https://www.strava.com/api/v3/athlete/activities?access_token=${authResult.data.access_token}&per_page=200`
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
    }
    fetchData();
  }, []);

  return (
    <main>
      {currentLocation?.length === 2 ? (
        <LazyMap points={activities} location={currentLocation} />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
