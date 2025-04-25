export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const R = 6371e3; // Radius of Earth in meters
  const lat_rad = toRadians(lat1);
  const lat_rad_dest = toRadians(lat2);
  const lat_diff = toRadians(lat2 - lat1);
  const lng_diff = toRadians(lng2 - lng1);

  const a =
    Math.sin(lat_diff / 2) * Math.sin(lat_diff / 2) +
    Math.cos(lat_rad) *
      Math.cos(lat_rad_dest) *
      Math.sin(lng_diff / 2) *
      Math.sin(lng_diff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Returns distance in meters
};
// export const geocodeAddress = (
//   geocoder: google.maps.Geocoder,
//   place: { name: string; address: string },
// ) => {
//   return new Promise<{
//     name: string;
//     lat: number;
//     lng: number;
//     isOriginal: boolean;
//   }>((resolve, reject) => {
//     geocoder.geocode({ address: place.address }, (results, status) => {
//       if (status === "OK" && results && results[0].geometry.location) {
//         resolve({
//           name: place.name,
//           lat: results[0].geometry.location.lat(),
//           lng: results[0].geometry.location.lng(),
//           isOriginal: true,
//         });
//       } else {
//         reject(`Geocode failed: ${status}`);
//       }
//     });
//   });
// };
import { PointOfInterest } from "./types";
import { allPlaceTypes } from "./MapConstants";
import { getIconAndPrimaryTypeForPlace } from "./MarkerIcons";
export const fetchNearbyPlaces = (
  lat: number,
  lng: number,
  map: google.maps.Map,
  cachedNearbyPlaces: React.MutableRefObject<Map<string, PointOfInterest[]>>,
  setPointsOfInterest: React.Dispatch<React.SetStateAction<PointOfInterest[]>>,
  house_id: number,
) => {
  const cacheKey = `${lat},${lng}`;
  console.log(house_id);
  if (cachedNearbyPlaces.current.has(cacheKey)) {
    //Check and use cached data
    setPointsOfInterest(cachedNearbyPlaces.current.get(cacheKey) || []);
    return;
  }

  const service = new google.maps.places.PlacesService(map);
  const location = new google.maps.LatLng(lat, lng);
  let allResults: google.maps.places.PlaceResult[] = [];
  let pageCount = 0;

  const handleSearchResults = (
    results: google.maps.places.PlaceResult[],
    status: google.maps.places.PlacesServiceStatus,
    pagination: google.maps.places.PlaceSearchPagination | null,
  ) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      allResults = [...allResults, ...results];
      pageCount++;

      // Map the PlaceResult array to PointOfInterest objects
      const filteredResults: PointOfInterest[] = allResults
        .filter(
          (result, index, self) =>
            index === self.findIndex((r) => r.place_id === result.place_id) &&
            result.types?.some((type) => allPlaceTypes.includes(type)),
        )
        .map((result) => {
          const { primaryType } = getIconAndPrimaryTypeForPlace(
            result.types || ["unknown"],
          );
          return {
            name: result.name || "Unknown",
            distance: calculateDistance(
              lat,
              lng,
              result.geometry?.location?.lat() || 0,
              result.geometry?.location?.lng() || 0,
            ),
            house_id: house_id,
            type: result.types || ["unknown"],
            lat: result.geometry?.location?.lat() || 0,
            lng: result.geometry?.location?.lng() || 0,
            primaryType,
          };
        });

      // Cache the PointOfInterest data with the cacheKey
      cachedNearbyPlaces.current.set(cacheKey, filteredResults);
      setPointsOfInterest(filteredResults);

      // Fetch the next page if available, up to 3 pages
      if (pagination && pagination.hasNextPage && pageCount < 3) {
        pagination.nextPage();
      }
    }
  };

  service.nearbySearch(
    {
      location,
      radius: 1000,
    },
    (results, status, pagination) => {
      handleSearchResults(results || [], status, pagination);
    },
  );
};
