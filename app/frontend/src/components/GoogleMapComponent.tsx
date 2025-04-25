import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import {
  markerIcons,
  highlightedMarkerIcon,
  createCustomIcon,
  getIconAndPrimaryTypeForPlace,
} from "../lib/MarkerIcons";
import { PointOfInterest } from "../lib/types";
import {
  allPlaceTypes,
  libraries,
  markerSize,
  containerStyle,
  center,
  searchDistance,
} from "../lib/MapConstants";
import { fetchNearbyPlaces } from "../lib/placeUtils";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  styled,
  Fade,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import MapHomeDetail from "./MapHomeDetail";
import { useApi } from "../lib/ApiContext";

// Styled components
const MapContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  "& .map-container": {
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
  },
}));

const FetchButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  left: "43%",
  zIndex: 1,
  borderRadius: "10px",
  backgroundColor: "#3b82f6",
  color: "white",
  transition: "all 0.3s ease-in-out", // Add smooth transition
  transform: "scale(1)", // Initial scale
  "&:hover": {
    background: "#77A9F8",
    transform: "scale(1.01)", // Slight scale up on hover
    boxShadow: "0 6px 20px rgba(255, 78, 80, 0.3)", // Add glow effect
  },
}));

const FilterButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const FilterOverlay = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 2,
  padding: theme.spacing(3),
  width: "200px",
  maxHeight: "80%",
  overflow: "auto",
  borderRadius: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
}));

const GoogleMapComponent: React.FC = () => {
  const { currentPlaces, fetchPlaces, getPlaceDetailById, filters } = useApi();
  const [selectedOriginalMarker, setSelectedOriginalMarker] = useState<{
    name: string;
    lat: number;
    lng: number;
    house_id: number;
  } | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<
    {
      name: string;
      lat: number;
      lng: number;
      isOriginal: boolean;
      house_id: number;
    }[]
  >([]);
  const [mapCenter, setMapCenter] = useState(center);
  const cachedNearbyPlaces = useRef<Map<string, PointOfInterest[]>>(new Map()); // Cache for nearby places
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(
    [],
  ); //POI list
  const mapCenterRef = useRef(mapCenter);
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterest | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(allPlaceTypes);
  const [showFilters, setShowFilters] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    libraries,
  });

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type],
    );
  };

  const handleMarkerClick = (place: {
    name: string;
    lat: number;
    lng: number;
    isOriginal: boolean;
    house_id: number;
  }) => {
    if (place.isOriginal) {
      setSelectedOriginalMarker(place);
      fetchNearbyPlaces(
        place.lat,
        place.lng,
        map!,
        cachedNearbyPlaces,
        setPointsOfInterest,
        place.house_id,
      );
    }
  };
  const handlePOIMarkerClick = (poi: PointOfInterest) => {
    setSelectedPOI(poi);
  };

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);
  useEffect(() => {
    setSelectedPOI(null);
    setSelectedOriginalMarker(null);
    setPointsOfInterest([]);
    fetchPlaces(mapCenter.lat, mapCenter.lng, searchDistance); // Initial fetch with default center and distance
  }, []);
  useEffect(() => {
    setSelectedPOI(null);
    setSelectedOriginalMarker(null);
    setPointsOfInterest([]);
    fetchPlaces(mapCenter.lat, mapCenter.lng, searchDistance);
  }, [filters]);
  useEffect(() => {
    if (isLoaded && map) {
      setMarkers(currentPlaces);
    }
  }, [isLoaded, map, currentPlaces]);

  const onIdle = () => {
    if (map) {
      const newCenter = map.getCenter();
      if (newCenter) {
        const newLat = newCenter.lat();
        const newLng = newCenter.lng();
        if (
          Math.abs(newLat - mapCenterRef.current.lat) > 0.0001 ||
          Math.abs(newLng - mapCenterRef.current.lng) > 0.0001
        ) {
          const updatedCenter = {
            lat: newLat,
            lng: newLng,
          };
          setMapCenter(updatedCenter);
          mapCenterRef.current = updatedCenter; // Update ref to avoid triggering re-render
        }
      }
    }
  };
  const handleFetchPlacesClick = () => {
    setSelectedPOI(null);
    setSelectedOriginalMarker(null);
    setPointsOfInterest([]);
    fetchPlaces(mapCenter.lat, mapCenter.lng, searchDistance);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const mapContainerWithCurve = {
    ...containerStyle,
    borderRadius: "16px",
    overflow: "hidden",
  };

  return isLoaded ? (
    <Box>
      <MapContainer>
        <GoogleMap
          mapContainerStyle={mapContainerWithCurve}
          center={mapCenter}
          zoom={12}
          onLoad={onLoad}
          onIdle={onIdle}
          options={{
            draggable: true,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {/* Filter Button */}
          <FilterButton onClick={toggleFilters} size="large">
            <FilterListIcon />
          </FilterButton>

          {/* Filter Overlay */}
          <Fade in={showFilters}>
            <FilterOverlay elevation={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Filter POI Types</Typography>
                <IconButton size="small" onClick={toggleFilters}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Grid container spacing={1}>
                {allPlaceTypes.map((type) => (
                  <Grid item xs={12} key={type}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleTypeChange(type)}
                          color="primary"
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          {type
                            .replace(/_/g, " ")
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </Typography>
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </FilterOverlay>
          </Fade>

          {/* Original Markers */}
          {markers.map((place) => (
            <Marker
              key={place.house_id}
              position={{ lat: place.lat, lng: place.lng }}
              onClick={() => handleMarkerClick(place)}
              icon={
                selectedOriginalMarker?.house_id === place.house_id
                  ? createCustomIcon(highlightedMarkerIcon, markerSize)
                  : createCustomIcon(markerIcons.original, markerSize)
              }
            />
          ))}

          {pointsOfInterest
            .filter(
              (poi) =>
                poi.house_id === selectedOriginalMarker?.house_id &&
                poi.type.some((type) => selectedTypes.includes(type)),
            )
            .map((poi, index) => {
              const { icon } = getIconAndPrimaryTypeForPlace(poi.type);
              return (
                <Marker
                  key={index}
                  position={{ lat: poi.lat, lng: poi.lng }}
                  onClick={() => handlePOIMarkerClick(poi)}
                  icon={createCustomIcon(icon, markerSize)}
                />
              );
            })}

          {selectedPOI && (
            <InfoWindow
              position={{ lat: selectedPOI.lat, lng: selectedPOI.lng }}
              onCloseClick={() => setSelectedPOI(null)}
            >
              <Box>
                <Typography variant="h6">{selectedPOI.name}</Typography>
                <Typography>Type: {selectedPOI.primaryType}</Typography>
                <Typography>
                  Distance: {selectedPOI.distance.toFixed(2)} meters
                </Typography>
              </Box>
            </InfoWindow>
          )}

          <FetchButton
            variant="contained"
            onClick={handleFetchPlacesClick}
            sx={{ boxShadow: 3 }}
          >
            Reload
          </FetchButton>
        </GoogleMap>
      </MapContainer>

      {selectedOriginalMarker && (
        <MapHomeDetail
          item={getPlaceDetailById(selectedOriginalMarker.house_id)!}
        />
      )}
    </Box>
  ) : (
    <Box>Loading...</Box>
  );
};

export default GoogleMapComponent;
