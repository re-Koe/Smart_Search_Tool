import { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  FormControl,
  TextField,
  Typography,
  Box,
  MenuItem,
  styled,
} from "@mui/material";

const FilterFormTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem", // Smaller font size for labels
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem", // Smaller font size for input text
  },
});

// Define a type for the filter object
interface Filters {
  searchRadius: number;
  priceRange: string;
  listingStatus: string;
  dateRange: string;
  relevanceScore: string;
}

interface FilterFormProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  applyFilters: () => void;
  onCancel: () => void;
}

const FilterForm = ({
  filters,
  setFilters,
  applyFilters,
  onCancel,
}: FilterFormProps) => {
  const [inputValues, setInputValues] = useState<Filters>(filters);

  useEffect(() => {
    setInputValues(filters);
  }, [filters]);

  const handleChange =
    (name: keyof Filters) => (event: ChangeEvent<HTMLInputElement>) => {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: event.target.value,
      }));
    };

  const handleSubmit = () => {
    setFilters(inputValues);
    applyFilters();
  };

  const handleCancel = () => {
    setInputValues(filters);
    onCancel();
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Filter Options
        </Typography>
        <FormControl fullWidth margin="normal">
          <FilterFormTextField
            id="searchRadius"
            label="Search Radius (in km)"
            type="number"
            fullWidth
            onChange={handleChange("searchRadius")}
            value={inputValues.searchRadius}
            variant="standard"
          />
          <FilterFormTextField
            id="priceRange"
            label="Price Range ($)"
            fullWidth
            onChange={handleChange("priceRange")}
            value={inputValues.priceRange}
            variant="standard"
          />
          <FilterFormTextField
            select
            label="Listing Status"
            id="listingStatus"
            value={inputValues.listingStatus}
            onChange={handleChange("listingStatus")}
            fullWidth
            variant="standard"
          >
            <MenuItem value="">Select a listing status...</MenuItem>
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"sold"}>Sold</MenuItem>
          </FilterFormTextField>
          <FilterFormTextField
            id="dateRange"
            label="Date Range (YYYY-MM-DD)"
            fullWidth
            onChange={handleChange("dateRange")}
            value={inputValues.dateRange}
            variant="standard"
          />
          <FilterFormTextField
            id="relevanceScore"
            label="Relevance Score Range (0-100)"
            fullWidth
            onChange={handleChange("relevanceScore")}
            value={inputValues.relevanceScore}
            variant="standard"
          />
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              id="cancel"
              variant="text"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              id="apply"
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Apply Filters
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default FilterForm;
