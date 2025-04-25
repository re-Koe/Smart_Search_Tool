import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import GoogleMapComponent from "./GoogleMapComponent";
import Chat from "./Chat";
import { useApi } from "../lib/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedBedrooms,
  setSelectedBathrooms,
  setHasAc,
  setHasBasement,
  setPrice,
  setSqft,
} from "../lib/searchSlice";
import PageTransition from "./PageTransition";
import LoadingSpinner from "./LoadingSpiner";

const SmartSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setFilter } = useApi();
  const {
    selectedBedrooms,
    selectedBathrooms,
    hasAc,
    hasBasement,
    sqft,
    price,
  } = useSelector((state: any) => state.search);

  const numBedrooms = [
    { val: 1, label: "1" },
    { val: 2, label: "2" },
    { val: 3, label: "3" },
    { val: 4, label: "4" },
    { val: 5, label: "5+" },
  ];

  const numBathrooms = [
    { val: 1, label: "1" },
    { val: 2, label: "2" },
    { val: 3, label: "3" },
    { val: 4, label: "4" },
    { val: 5, label: "5+" },
  ];

  const priceOptions = [
    { val: 250000, label: "$250,000" },
    { val: 500000, label: "$500,000" },
    { val: 1000000, label: "$1,000,000" },
    { val: 2000000, label: "$2,000,000" },
    { val: 3000000, label: "$3,000,000" },
  ];

  const SqftOptions = [
    { val: 1000, label: "1,000" },
    { val: 2000, label: "2,000" },
    { val: 3000, label: "3,000" },
    { val: 4000, label: "4,000" },
    { val: 5000, label: "5,000+" },
  ];

  useEffect(() => {
    setFilter("bedrooms", selectedBedrooms);
    setFilter("bathrooms", selectedBathrooms);
    setFilter("has_ac", hasAc);
    setFilter("has_basement", hasBasement);
    setFilter("price", price);
    setFilter("sqft", sqft);
  }, [selectedBedrooms, selectedBathrooms, hasAc, hasBasement, price, sqft]);

  const [isLoading, setIsLoading] = useState(false);

  const handleViewResults = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading
      navigate("/results");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <PageTransition>
        <Box sx={{ padding: "24px" }}>
          <Grid container spacing={3}>
            {/* Left Third - Chat Box */}
            <Grid item xs={4} sx={{ height: "calc(93%)" }}>
              <Chat />
            </Grid>

            {/* Right Two-Thirds */}
            <Grid item xs={8}>
              <Grid container spacing={6}>
                {/* Upper Right - Filters */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "20px",
                      padding: "20px",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "300",
                        marginBottom: "12px",
                        textAlign: "center",
                      }}
                    >
                      Filters
                    </Typography>

                    {/* Grid for filters */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "300",
                              width: "80px",
                            }}
                          >
                            Bedrooms:
                          </Typography>
                          <FormControl
                            size="small"
                            fullWidth
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "14px",
                              },
                            }}
                          >
                            <Select
                              value={selectedBedrooms}
                              onChange={(e) =>
                                dispatch(setSelectedBedrooms(e.target.value))
                              }
                              displayEmpty
                            >
                              <MenuItem value="">Any</MenuItem>
                              {numBedrooms.map(({ val, label }) => (
                                <MenuItem key={val} value={val}>
                                  {label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "300",
                              width: "80px",
                            }}
                          >
                            Bathrooms:
                          </Typography>
                          <FormControl
                            size="small"
                            fullWidth
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "14px",
                              },
                            }}
                          >
                            <Select
                              value={selectedBathrooms}
                              onChange={(e) =>
                                dispatch(setSelectedBathrooms(e.target.value))
                              }
                              displayEmpty
                            >
                              <MenuItem value="">Any</MenuItem>
                              {numBathrooms.map(({ val, label }) => (
                                <MenuItem key={val} value={val}>
                                  {label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "300",
                              width: "80px",
                            }}
                          >
                            Has AC:
                          </Typography>
                          <FormControl
                            size="small"
                            fullWidth
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "14px",
                              },
                            }}
                          >
                            <Select
                              value={hasAc}
                              onChange={(e) =>
                                dispatch(setHasAc(e.target.value))
                              }
                              displayEmpty
                            >
                              <MenuItem value="">Any</MenuItem>
                              <MenuItem value="true">Yes</MenuItem>
                              <MenuItem value="false">No</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "300",
                              width: "80px",
                            }}
                          >
                            Has Basement:
                          </Typography>
                          <FormControl
                            size="small"
                            fullWidth
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "14px",
                              },
                            }}
                          >
                            <Select
                              value={hasBasement}
                              onChange={(e) =>
                                dispatch(setHasBasement(e.target.value))
                              }
                              displayEmpty
                            >
                              <MenuItem value="">Any</MenuItem>
                              <MenuItem value="true">Yes</MenuItem>
                              <MenuItem value="false">No</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "300",
                              width: "80px",
                            }}
                          >
                            Square Footage:
                          </Typography>
                          <FormControl
                            size="small"
                            fullWidth
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "14px",
                              },
                            }}
                          >
                            <Select
                              value={sqft}
                              onChange={(e) =>
                                dispatch(setSqft(e.target.value))
                              }
                              displayEmpty
                            >
                              <MenuItem value="">Any</MenuItem>
                              {SqftOptions.map(({ val, label }) => (
                                <MenuItem key={val} value={val}>
                                  {label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "300",
                              width: "80px",
                            }}
                          >
                            <Box>Price</Box>
                            <Box>(less than):</Box>
                          </Typography>
                          <FormControl
                            size="small"
                            fullWidth
                            sx={{
                              "& .MuiInputBase-root": {
                                fontSize: "14px",
                              },
                            }}
                          >
                            <Select
                              value={price}
                              onChange={(e) =>
                                dispatch(setPrice(e.target.value))
                              }
                              displayEmpty
                            >
                              <MenuItem value="">Any</MenuItem>
                              {priceOptions.map(({ val, label }) => (
                                <MenuItem key={val} value={val}>
                                  {label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Button */}
                    <Button
                      onClick={handleViewResults}
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        padding: "10px",
                        background:
                          "linear-gradient(90deg, #ff4e50, #fc6767, #dd3c3c)",
                        color: "white",
                        borderRadius: "40px",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.3s ease-in-out", // Add smooth transition
                        transform: "scale(1)", // Initial scale
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #ff5e5e, #ff8080, #e63939)",
                          transform: "scale(1.01)", // Slight scale up on hover
                          boxShadow: "0 6px 20px rgba(255, 78, 80, 0.3)", // Add glow effect
                        },
                      }}
                    >
                      View Results
                    </Button>
                  </Box>
                </Grid>

                {/* Lower Right - Map */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "20px",
                      padding: "16px",
                      marginTop: "-24px",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                      height: "100%",
                    }}
                  >
                    <GoogleMapComponent />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </PageTransition>
    </>
  );
};

export default SmartSearch;
