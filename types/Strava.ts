export interface ActivityResponse {
  id: number;
  name: string;
  map: Map;
}

export interface Map {
  id: string;
  summary_polyline: string;
}

export interface Activity {
  id: number;
  name: string;
  positions: [number, number][];
}
