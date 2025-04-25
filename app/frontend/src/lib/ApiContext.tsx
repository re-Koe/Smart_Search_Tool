import React, { createContext, useContext, useState, ReactNode } from "react";

export const url = import.meta.env.VITE_API_URL;

interface Place {
  name: string;
  lat: number;
  lng: number;
  isOriginal: boolean;
  house_id: number;
}

export interface PlaceDetails extends Place {
  year: number;
  has_ac: boolean;
  has_basement: boolean;
  photos: string[];
  address: string;
  price: string;
  description: string;
  bathrooms: number;
  bedrooms: number;
  squareFootage: number;
  contactInfo: string;
  image_ids: string[];
  city: string;
  area_code: string;
}

interface ApiContextProps {
  cachePlaces: Place[];
  cachePlaceDetails: PlaceDetails[];
  currentPlaces: Place[];
  filters: Map<string, string>;
  bookmarkedHomes: PlaceDetails[]; // Added
  setFilter: (key: string, value: string) => void;
  fetchPlaces: (lat: number, lon: number, distance: number) => Promise<void>;
  fetchPlaceDetails: (places: Place[]) => Promise<void>;
  getPlaceDetailsByCurrentPlaces: () => PlaceDetails[];
  getPlaceDetailById: (houseId: number) => PlaceDetails | undefined;
  addBookmark: (place: PlaceDetails) => void; // Added
  removeBookmark: (houseId: number) => void; // Added
  isBookmarked: (houseId: number) => boolean; // Added
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cachePlaces, setCachePlaces] = useState<Place[]>([]);
  const [cachePlaceDetails, setCachePlaceDetails] = useState<PlaceDetails[]>(
    [],
  );
  const [currentPlaces, setCurrentPlaces] = useState<Place[]>([]);
  const [filters, setFilters] = useState<Map<string, string>>(new Map());
  const [bookmarkedHomes, setBookmarkedHomes] = useState<PlaceDetails[]>([]); // Added

  const setFilter = (key: string, value: string) => {
    setFilters((prevFilters) => {
      const newFilters = new Map(prevFilters);
      if (value) {
        newFilters.set(key, value);
      } else {
        newFilters.delete(key);
      }
      return newFilters;
    });
  };

  const addBookmark = (place: PlaceDetails) => {
    setBookmarkedHomes((prev) => {
      if (!prev.some((home) => home.house_id === place.house_id)) {
        return [...prev, place];
      }
      return prev;
    });
  };

  const removeBookmark = (houseId: number) => {
    setBookmarkedHomes((prev) =>
      prev.filter((home) => home.house_id !== houseId),
    );
  };

  const isBookmarked = (houseId: number): boolean => {
    return bookmarkedHomes.some((home) => home.house_id === houseId);
  };

  const fetchPlaces = async (lat: number, lon: number, distance: number) => {
    const filtersObject = Object.fromEntries(filters);

    const queryFilters = Object.entries(filtersObject)
      .filter(([_, value]) => Boolean(value))
      .reduce<Record<string, any>>((acc, [key, value]) => {
        switch (key) {
          case "has_ac":
            acc["has_ac"] = value === "true" ? 1 : 0;
            break;
          case "has_basement":
            acc["has_basement"] = value === "true" ? 1 : 0;
            break;
          default:
            acc[key] = value;
        }
        return acc;
      }, {});

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat: lat,
        lon: lon,
        distance: distance,
        filters: queryFilters,
      }),
    };
    try {
      const searchurl = `${url}/api/search`;
      const response = await fetch(searchurl, requestOptions);
      const data = await response.json();
      console.log(data);

      const placesWithIds = data.houses.map((place: any) => ({
        ...place,
        lng: place.lon,
        isOriginal: true,
        house_id: place.id,
        name: place.name,
        lat: place.lat,
      }));

      console.log(placesWithIds);

      // Filter out places that are already in the cache
      const newPlaces: Place[] = placesWithIds.filter(
        (newPlace: Place) =>
          !cachePlaces.some(
            (cachedPlace: Place) => cachedPlace.house_id === newPlace.house_id,
          ),
      );

      setCurrentPlaces(placesWithIds);
      if (newPlaces.length > 0) {
        setCachePlaces((prev) => [...prev, ...newPlaces]);
        fetchPlaceDetails(newPlaces); // Fetch details for new places
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchPlaceDetails = async (places: Place[]) => {
    const newPlaces = places.filter(
      (place) =>
        !cachePlaceDetails.some((detail) => detail.house_id === place.house_id),
    );

    if (newPlaces.length === 0) return;

    const placeDetails = await Promise.all(
      newPlaces.map(async (place) => {
        const response = await fetch(`${url}/api/property/${place.house_id}`);
        const data = await response.json();
        console.log("Fetched data for place:", data);
        const photos = Array.isArray(data.images)
          ? data.images.map((imgId: string) => `${url}/api/images/${imgId}`)
          : [];
        const mappedDetails: PlaceDetails = {
          ...place,
          house_id: data.id,
          year: data.year_built,
          has_ac: data.has_ac,
          has_basement: data.has_basement,
          photos: photos,
          address: data.address,
          price: data.price,
          description: data.description,
          bathrooms: data.bathrooms,
          bedrooms: data.bedrooms,
          squareFootage: data.sqft,
          contactInfo: data.contact_info,
          image_ids: data.images,
          city: data.city,
          area_code: data.area_code,
        };
        return mappedDetails;
      }),
    );

    console.log("New place details:", placeDetails);

    setCachePlaceDetails((prev) => {
      const updatedCache = [...prev];
      placeDetails.forEach((detail) => {
        const index = updatedCache.findIndex(
          (d) => d.house_id === detail.house_id,
        );
        if (index !== -1) {
          updatedCache[index] = detail; // Update existing entry
        } else {
          updatedCache.push(detail); // Add new entry
        }
      });
      console.log("Updated cachePlaceDetails:", updatedCache);
      return updatedCache;
    });
  };

  const getPlaceDetailsByCurrentPlaces = (): PlaceDetails[] => {
    return cachePlaceDetails.filter((detail) =>
      currentPlaces.some((place) => place.house_id === detail.house_id),
    );
  };

  const getPlaceDetailById = (houseId: number): PlaceDetails | undefined => {
    return cachePlaceDetails.find((detail) => detail.house_id === houseId);
  };

  return (
    <ApiContext.Provider
      value={{
        cachePlaces,
        cachePlaceDetails,
        currentPlaces,
        filters,
        bookmarkedHomes, // Exposed
        setFilter,
        fetchPlaces,
        fetchPlaceDetails,
        getPlaceDetailsByCurrentPlaces,
        getPlaceDetailById,
        addBookmark, // Exposed
        removeBookmark, // Exposed
        isBookmarked, // Exposed
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextProps => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
