// Marker icons based on place types
export const markerIcons = {
  education:
    "https://wiki.openstreetmap.org/w/images/thumb/1/18/Books-16.svg/240px-Books-16.svg.png", // Education icon for schools, universities, etc.
  shopping:
    "https://wiki.openstreetmap.org/w/images/thumb/7/76/Supermarket-14.svg/240px-Supermarket-14.svg.png", // Shopping icon for stores, supermarkets, malls
  restaurant:
    "https://wiki.openstreetmap.org/w/images/thumb/b/bb/Restaurant-14.svg/240px-Restaurant-14.svg.png", // Restaurant icon
  cafe: "https://wiki.openstreetmap.org/w/images/thumb/d/da/Cafe-16.svg/240px-Cafe-16.svg.png", // Cafe icon
  bar: "https://wiki.openstreetmap.org/w/images/thumb/e/e1/Biergarten-16.svg/240px-Biergarten-16.svg.png", // Bar icon
  supermarket:
    "https://wiki.openstreetmap.org/w/images/thumb/7/76/Supermarket-14.svg/240px-Supermarket-14.svg.png", // Supermarket icon
  recreation:
    "https://wiki.openstreetmap.org/w/images/thumb/b/bd/Fitness.svg/240px-Fitness.svg.png", // Recreation icon for parks, gyms, etc.
  bus_station:
    "https://wiki.openstreetmap.org/w/images/thumb/5/5a/Amenity_bus_station.svg/240px-Amenity_bus_station.svg.png", // Bus station icon
  subway_station:
    "https://wiki.openstreetmap.org/w/images/thumb/5/5a/Amenity_bus_station.svg/240px-Amenity_bus_station.svg.png", // Subway station icon
  default: "https://maps.google.com/mapfiles/kml/pal3/icon56.png", // Default icon
  original:
    "https://img.icons8.com/?size=100&id=YnNtwrUToUw2&format=png&color=000000", // Icon for original markers
};

type MarkerIconKeys =
  | "education"
  | "shopping"
  | "restaurant"
  | "cafe"
  | "bar"
  | "supermarket"
  | "recreation"
  | "bus_station"
  | "subway_station"
  | "default"
  | "original";

export const highlightedMarkerIcon =
  "https://img.icons8.com/?size=100&id=em64FLi9Djh8&format=png&color=000000"; //  Highlighted Original Marker

//Maps Place Types to Icons
export const typeToIconMap = {
  education: ["school", "university", "library"],
  shopping: ["store", "supermarket", "shopping_mall"],
  restaurant: ["restaurant"],
  cafe: ["cafe"],
  bar: ["bar"],
  recreation: ["park", "gym", "movie_theater"],
  bus_station: ["bus_station"],
  subway_station: ["subway_station"],
};

//Creates a new icon by resizing existing Icon
export const createCustomIcon = (url: string, size: number) => {
  return {
    url: url,
    scaledSize: new google.maps.Size(size, size), // Define size
  };
};

export const getIconAndPrimaryTypeForPlace = (
  types: string[],
): { icon: string; primaryType: string } => {
  for (const [iconKey, typeList] of Object.entries(typeToIconMap) as [
    MarkerIconKeys,
    string[],
  ][]) {
    const matchingType = types.find((type: string) => typeList.includes(type));
    if (matchingType) {
      return {
        icon: markerIcons[iconKey], // iconKey is now of type MarkerIconKeys
        primaryType: matchingType
          .replace(/_/g, " ")
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      };
    }
  }
  return {
    icon: markerIcons.default, // 'default' is a valid key
    primaryType: "Unknown",
  };
};
