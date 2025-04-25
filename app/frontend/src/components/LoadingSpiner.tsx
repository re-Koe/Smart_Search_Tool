// LoadingSpinner.tsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }}
    >
      <CircularProgress
        sx={{
          color: "#ff4e50",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
        size={60}
      />
    </Box>
  );
};

export default LoadingSpinner;
