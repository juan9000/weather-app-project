export interface PartialLocation {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
  fullName: string;
};

export interface SearchQuery {
  q?: string, 
}