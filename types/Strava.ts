export interface AuthResponseData {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
export interface AuthResponse {
  status: number;
  data: AuthResponseData;
}

export interface ActivityResponse {
  id: number;
  name: string;
  map: Map;
}

export interface Map {
  id: string;
  summary_polyline: string;
}

export interface Athlete {
  id: number;
}

export interface Activity {
  id: number;
  name: string;
  positions: [number, number][];
}
