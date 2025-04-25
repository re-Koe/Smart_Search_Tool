import React from "react";
import HomeListItem from "./HomeListItem";
import { PlaceDetails } from "../lib/ApiContext";
import { useApi } from "../lib/ApiContext";
import { Typography } from "@mui/material";

interface HomeListProps {
  homes: PlaceDetails[];
  onOpenModal: (home: PlaceDetails) => void;
}

const HomeList: React.FC<HomeListProps> = ({ homes, onOpenModal }) => {
  // Use the ApiContext to access bookmark-related state and functions
  const { addBookmark, removeBookmark, isBookmarked } = useApi();

  const handleToggleBookmark = (home: PlaceDetails) => {
    if (isBookmarked(home.house_id)) {
      removeBookmark(home.house_id);
    } else {
      addBookmark(home);
    }
  };

  if (!homes || homes.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        mt={4}
      >
        No properties available in list view.
      </Typography>
    );
  }

  return (
    <div>
      {homes.map((home) => (
        <HomeListItem
          key={home.house_id}
          home={home}
          onOpenModal={onOpenModal}
          onBookmark={() => handleToggleBookmark(home)}
          isBookmarked={isBookmarked(home.house_id)} // Use the isBookmarked function from context
        />
      ))}
    </div>
  );
};

export default HomeList;
