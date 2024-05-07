"use client";

import dynamic from "next/dynamic";

import teslaData from "./../data/tesla-sites.json";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <main>
      <LazyMap pointsData={teslaData} />
    </main>
  );
}
