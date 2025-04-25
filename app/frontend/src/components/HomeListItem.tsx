import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { BookmarkBorder, Bookmark } from "@mui/icons-material";
import { styled } from "@mui/system";
import { PlaceDetails } from "../lib/ApiContext";
interface HomeListItemProps {
  home: PlaceDetails;
  onOpenModal: (home: PlaceDetails) => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

const StyledListItem = styled(ListItem)({
  padding: "12px",
  "& .MuiListItemAvatar-root": {
    marginRight: "16px",
    minWidth: "auto",
  },
  "& .MuiAvatar-root": {
    width: "180px",
    height: "140px",
    borderRadius: "4px",
  },
});

const ContentWrapper = styled(Box)({
  display: "flex",
  flexGrow: 1,
  gap: "16px",
  minHeight: "140px",
});

const PropertyDetail = styled(Box)({
  marginBottom: "8px",
  "& .MuiTypography-root": {
    lineHeight: 1.1,
  },
});

const HomeListItem: React.FC<HomeListItemProps> = ({
  home,
  onOpenModal,
  onBookmark,
  isBookmarked,
}) => {
  return (
    <>
      <StyledListItem alignItems="flex-start">
        <ContentWrapper>
          <ListItemAvatar>
            <Avatar variant="square" src={home.photos[0]} alt={home.address} />
          </ListItemAvatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#027fa7",
                fontSize: "1.1rem",
                marginBottom: "4px",
                fontWeight: 300, // Easily adjustable weight
              }}
            >
              {home.address}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                marginBottom: "8px",
                fontWeight: 300, // Easily adjustable weight
              }}
            >
              {home.description.length > 100
                ? `${home.description.substring(0, 100)}...`
                : home.description}
            </Typography>

            <Grid container spacing={1} sx={{ mt: 0.5 }}>
              <Grid item xs={6}>
                <PropertyDetail>
                  <Typography
                    sx={{
                      fontWeight: 300, // Easily adjustable weight
                      marginBottom: "4px",
                      fontSize: "0.6125rem",
                    }}
                  >
                    Price
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 300, // Easily adjustable weight
                    }}
                  >
                    {home.price}
                  </Typography>
                </PropertyDetail>
              </Grid>
              <Grid item xs={6}>
                <PropertyDetail>
                  <Typography
                    sx={{
                      fontWeight: 300, // Easily adjustable weight
                      marginBottom: "4px",
                      fontSize: "0.6125rem",
                    }}
                  >
                    Bedrooms
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 300, // Easily adjustable weight
                    }}
                  >
                    {home.bedrooms}
                  </Typography>
                </PropertyDetail>
              </Grid>
              <Grid item xs={6}>
                <PropertyDetail>
                  <Typography
                    sx={{
                      fontWeight: 300, // Easily adjustable weight
                      marginBottom: "4px",
                      fontSize: "0.6125rem",
                    }}
                  >
                    Bathrooms
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 300, // Easily adjustable weight
                    }}
                  >
                    {home.bathrooms}
                  </Typography>
                </PropertyDetail>
              </Grid>
              <Grid item xs={6}>
                <PropertyDetail>
                  <Typography
                    sx={{
                      fontWeight: 300, // Easily adjustable weight
                      marginBottom: "4px",
                      fontSize: "0.6125rem",
                    }}
                  >
                    Square Footage
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 300, // Easily adjustable weight
                    }}
                  >
                    {home.squareFootage} sq ft
                  </Typography>
                </PropertyDetail>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <IconButton
              size="small"
              onClick={onBookmark}
              color={isBookmarked ? "primary" : "default"}
              sx={{ padding: "4px" }}
            >
              {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onOpenModal(home)}
              sx={{
                fontSize: "0.6125rem",
                padding: "4px 8px",
              }}
            >
              View Details
            </Button>
          </Box>
        </ContentWrapper>
      </StyledListItem>
      <Divider />
    </>
  );
};

export default HomeListItem;
