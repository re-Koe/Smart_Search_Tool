export interface Contact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  clientResources: string;
  realtorId: string;
  image: string | undefined;
  id: number;
}
export interface PointOfInterest {
  name: string;
  distance: number; // Distance in meters
  type: string[];
  lat: number; // Latitude of the place
  lng: number; // Longitude of the place
  primaryType: string;
  house_id: number;
}

export type PriceRange = {
  low: number;
  high: number;
};
