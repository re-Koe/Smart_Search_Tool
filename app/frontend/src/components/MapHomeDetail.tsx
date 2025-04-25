import React, { useState } from "react";
import { PlaceDetails } from "../lib/ApiContext";
import { Box, Button, Typography } from "@mui/material";

interface MapHomeDetailProps {
  item: PlaceDetails;
}

const MapHomeDetail: React.FC<MapHomeDetailProps> = ({ item }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const nextPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex + 1) % (item.photos?.length || 1),
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) =>
        (prevIndex - 1 + (item.photos?.length || 1)) %
        (item.photos?.length || 1),
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        width: "100%",
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      {item.photos && item.photos.length > 0 ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "400px",
            marginBottom: "20px",
          }}
        >
          <img
            src={item.photos[currentPhotoIndex]}
            alt={`Property ${currentPhotoIndex + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Button onClick={prevPhoto} sx={{ position: "absolute", left: 0 }}>
            Prev
          </Button>
          <Button onClick={nextPhoto} sx={{ position: "absolute", right: 0 }}>
            Next
          </Button>
        </Box>
      ) : (
        <Typography variant="body1">No photos available</Typography>
      )}
      <Typography variant="h5">
        {item.address || "No address available"}
      </Typography>
      <Typography variant="h6" sx={{ color: "#666666", fontWeight: 100 }}>
        {item.price || "No price available"}
      </Typography>
      <Typography variant="body1">
        {item.description || "No description available"}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 2fr))",
          gap: "20px",
          color: "#666666",
          fontWeight: 300,
          fontSize: "0.95em",
          marginTop: "20px",
        }}
      >
        <Box>
          <Box component="span" sx={{ color: "#027fa7" }}>
            Bedrooms:
          </Box>{" "}
          <Box component="span">{item.bedrooms || "N/A"}</Box>
        </Box>
        <Box>
          <Box component="span" sx={{ color: "#027fa7" }}>
            Bathrooms:
          </Box>{" "}
          <Box component="span">{item.bathrooms || "N/A"}</Box>
        </Box>
        <Box>
          <Box component="span" sx={{ color: "#027fa7" }}>
            Square Footage:
          </Box>{" "}
          <Box component="span">
            {item.squareFootage ? `${item.squareFootage} sq ft` : "N/A"}
          </Box>
        </Box>
        <Box>
          <Box component="span" sx={{ color: "#027fa7" }}>
            Year Built:
          </Box>{" "}
          <Box component="span">{item.year || "N/A"}</Box>
        </Box>
        <Box>
          <Box component="span" sx={{ color: "#027fa7" }}>
            Air Conditioning:
          </Box>{" "}
          <Box component="span">{item.has_ac ? "Yes" : "No"}</Box>
        </Box>
        <Box>
          <Box component="span" sx={{ color: "#027fa7" }}>
            Basement:
          </Box>{" "}
          <Box component="span">{item.has_basement ? "Yes" : "No"}</Box>
        </Box>
        <Box>
          <Box component="span" sx={{ color: "#027fa7" }}>
            Contact Info:
          </Box>{" "}
          <Box component="span">{item.contactInfo || "N/A"}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MapHomeDetail;
