export interface ActivityResponse {
  id: string;
  name: string;
  map: Map;
}

export interface Map {
  id: string;
  summary_polyline: string;
}

export interface Activity {
  id: string;
  name: string;
  positions: [number, number][];
}
