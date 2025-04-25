import React, { useState, useEffect } from "react";
// import { ItemData } from "./HomeCard";
import { Box, Button, Fade } from "@mui/material";
import { PlaceDetails } from "../lib/ApiContext";
interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  item: PlaceDetails;
  // onPrevItem: () => void;
  // onNextItem: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
  open,
  onClose,
  item,
  // onPrevItem,
  // onNextItem,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    }
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    // Add a small delay before actually closing the modal
    setTimeout(onClose, 200);
  };

  if (!open) return null;

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % item.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + item.photos.length) % item.photos.length,
    );
  };

  return (
    <Fade in={isVisible} timeout={200}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
        onClick={handleClose}
      >
        <Fade in={isVisible} timeout={200}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "800px",
              height: "70%",
              maxHeight: "800px",
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: "16px",
                left: "16px",
                backgroundColor: "white",
                minWidth: "30px",
                width: "30px",
                height: "30px",
                padding: 0,
                borderRadius: "50%",
                zIndex: 1100,
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  backgroundColor: "white",
                },
                "& span": {
                  color: "#FF0000",
                  fontSize: "18px",
                  fontWeight: "300",
                },
              }}
            >
              <span>×</span>
            </Button>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "50%",
                minHeight: "300px",
                overflow: "hidden",
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
              <Button
                onClick={prevPhoto}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "16px",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(1, 1, 1, 1.0)",
                  minWidth: "40px",
                  width: "40px",
                  height: "40px",
                  padding: 0,
                  borderRadius: "50%",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  },
                }}
              >
                &lt;
              </Button>
              <Button
                onClick={nextPhoto}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "16px",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(1, 1, 1, 1.0)",
                  minWidth: "40px",
                  width: "40px",
                  height: "40px",
                  padding: 0,
                  borderRadius: "50%",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  },
                }}
              >
                &gt;
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
                marginTop: "12px",
                marginInline: "3%",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5em",
                  fontWeight: 100,
                  color: "#027fa7",
                  margin: 0,
                }}
              >
                {item.address}
              </h2>
              <h2
                style={{
                  fontSize: "1.5em",
                  fontWeight: 100,
                  color: "#666666",
                  margin: 0,
                }}
              >
                {item.price}
              </h2>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                padding: "10px 25px",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 2fr))",
                  gap: "20px",
                  color: "#666666",
                  fontWeight: 300,
                  fontSize: "0.95em",
                }}
              >
                <Box>
                  <Box component="span" sx={{ color: "#027fa7" }}>
                    Bedrooms:
                  </Box>{" "}
                  <Box component="span">{item.bedrooms}</Box>
                </Box>
                <Box>
                  <Box component="span" sx={{ color: "#027fa7" }}>
                    Bathrooms:
                  </Box>{" "}
                  <Box component="span">{item.bathrooms}</Box>
                </Box>
                <Box>
                  <Box component="span" sx={{ color: "#027fa7" }}>
                    Square Footage:
                  </Box>{" "}
                  <Box component="span">{item.squareFootage} sq ft</Box>
                </Box>
                <Box>
                  <Box component="span" sx={{ color: "#027fa7" }}>
                    Contact:
                  </Box>{" "}
                  <Box component="span">{item.contactInfo}</Box>
                </Box>
              </Box>
              <p
                style={{
                  marginBottom: "20px",
                  fontWeight: 100,
                  lineHeight: 1.5,
                  fontSize: "0.9em",
                }}
              >
                {item.description}
              </p>
            </Box>
          </Box>
        </Fade>

        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "20%",
            cursor: "pointer",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onPrevItem();
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "20%",
            cursor: "pointer",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onNextItem();
          }}
        /> */}
      </Box>
    </Fade>
  );
};

export default DetailModal;
