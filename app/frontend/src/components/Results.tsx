import React, { useState } from "react";
import HomeCard from "./HomeCard";
import HomeList from "./HomeList";
import { useApi, PlaceDetails } from "../lib/ApiContext";
import {
  Grid,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  styled,
  Typography,
  Paper,
} from "@mui/material";
import DetailModal from "./DetailModal";
import { useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButton-root": {
    height: "40px",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontSize: "0.775rem",
    fontWeight: 300,
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    fontSize: "0.775rem",
    transform: "translate(14px, 8px)",
  },
  "& .MuiSelect-select": {
    height: "24px",
    fontSize: "0.775rem",
    fontWeight: 300,
  },
  "& .MuiOutlinedInput-root": {
    height: "40px",
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -9px) scale(0.75)",
  },
  "& .MuiMenuItem-root": {
    fontSize: "0.775rem",
    fontWeight: 300,
  },
}));

const filterOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Square Footage: Low to High", value: "sqft-asc" },
  { label: "Square Footage: High to Low", value: "sqft-desc" },
  { label: "Bedrooms: Low to High", value: "bedrooms-asc" },
  { label: "Bedrooms: High to Low", value: "bedrooms-desc" },
  { label: "Bathrooms: Low to High", value: "bathrooms-asc" },
  { label: "Bathrooms: High to Low", value: "bathrooms-desc" },
];

const Results: React.FC = () => {
  const {
    getPlaceDetailsByCurrentPlaces,
    addBookmark,
    removeBookmark,
    isBookmarked,
  } = useApi();
  const placeDetails = getPlaceDetailsByCurrentPlaces();

  // Fetch SmartSearch filters from Redux
  const { selectedBedrooms, selectedBathrooms, hasAc, hasBasement } =
    useSelector((state: any) => state.search);

  // Local state for Results-specific filters
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedHome, setSelectedHome] = useState<PlaceDetails | null>(null);
  const [filterBy, setFilterBy] = useState<string>("price-asc");

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: "grid" | "list",
  ) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterBy(event.target.value);
  };

  const handleToggleBookmark = (home: PlaceDetails) => {
    if (isBookmarked(home.house_id)) {
      removeBookmark(home.house_id);
    } else {
      addBookmark(home);
    }
  };

  const handleOpenModal = (home: PlaceDetails) => {
    setSelectedHome(home);
  };

  const handleCloseModal = () => {
    setSelectedHome(null);
  };

  // Filter the data based on SmartSearch filters
  const filteredData = placeDetails || [];

  // Apply additional sorting based on Results filters
  const sortedData = filteredData.sort((a, b) => {
    switch (filterBy) {
      case "price-asc":
        return (
          parseFloat(String(a.price || "0").replace(/[$,]/g, "")) -
          parseFloat(String(b.price || "0").replace(/[$,]/g, ""))
        );
      case "price-desc":
        return (
          parseFloat(String(b.price || "0").replace(/[$,]/g, "")) -
          parseFloat(String(a.price || "0").replace(/[$,]/g, ""))
        );
      case "sqft-desc":
        return (b.squareFootage || 0) - (a.squareFootage || 0);
      case "sqft-asc":
        return (a.squareFootage || 0) - (b.squareFootage || 0);
      case "bedrooms-asc":
        return a.bedrooms - b.bedrooms;
      case "bedrooms-desc":
        return b.bedrooms - a.bedrooms;
      case "bathrooms-asc":
        return a.bathrooms - b.bathrooms;
      case "bathrooms-desc":
        return b.bathrooms - a.bathrooms;
      default:
        return 0;
    }
  });

  if (!sortedData || sortedData.length === 0) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No properties found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search filters to see more results
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box my={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* View toggle buttons */}
          <StyledToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="View Toggle"
          >
            <ToggleButton value="grid" aria-label="Grid View">
              Grid View
            </ToggleButton>
            <ToggleButton value="list" aria-label="List View">
              List View
            </ToggleButton>
          </StyledToggleButtonGroup>

          {/* Sort by dropdown */}
          <StyledFormControl sx={{ minWidth: 200 }}>
            <InputLabel id="filter-label">Sort By</InputLabel>
            <Select
              labelId="filter-label"
              value={filterBy}
              onChange={(e) => handleFilterChange(e)}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Stack>
      </Box>

      {/* Grid or List view */}
      {view === "grid" ? (
        <Grid container spacing={4}>
          {sortedData.map((home) => (
            <Grid item xs={12} sm={6} md={4} key={home.house_id}>
              <HomeCard
                home={home}
                onOpenModal={handleOpenModal}
                onBookmark={() => handleToggleBookmark(home)}
                isBookmarked={isBookmarked(home.house_id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <HomeList homes={sortedData} onOpenModal={handleOpenModal} />
      )}

      {/* Detail modal */}
      {selectedHome && (
        <DetailModal
          open={!!selectedHome}
          onClose={handleCloseModal}
          item={selectedHome}
        />
      )}
    </Container>
  );
};

export default Results;
