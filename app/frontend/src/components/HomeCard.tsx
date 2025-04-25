import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { PlaceDetails } from "../lib/ApiContext";

export interface ItemData {
  id: number;
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
}

interface HomeCardProps {
  home: PlaceDetails;
  onOpenModal: (home: PlaceDetails) => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

const HomeCard: React.FC<HomeCardProps> = ({
  home,
  onOpenModal,
  onBookmark,
  isBookmarked,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={home.photos[0]}
        alt={home.address}
      />
      <CardContent>
        <Typography
          sx={{
            color: "#027fa7 !important", // Added !important to override theme
            fontSize: "1.25rem",
            fontWeight: 300,
            marginBottom: "8px",
          }}
        >
          {home.address}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
            fontWeight: 300,
            marginBottom: "8px",
          }}
        >
          {home.description.length > 100
            ? `${home.description.substring(0, 100)}...`
            : home.description}
        </Typography>
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "1rem",
            fontWeight: 300,
            marginBottom: "4px",
          }}
        >
          ${home.price}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
            fontWeight: 300,
          }}
        >
          {home.bedrooms} beds | {home.bathrooms} baths | {home.squareFootage}{" "}
          sq ft
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            size="small"
            onClick={() => onOpenModal(home)}
            sx={{
              fontSize: "0.8125rem",
              fontWeight: 300,
            }}
          >
            View Details
          </Button>
          <IconButton
            size="small"
            onClick={onBookmark}
            color={isBookmarked ? "primary" : "default"}
          >
            {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default HomeCard;
