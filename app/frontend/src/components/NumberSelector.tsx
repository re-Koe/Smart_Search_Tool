import React from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid2,
  Typography,
} from "@mui/material";

interface NumberSelectorProps {
  label: string;
  name: string;
  value: string | number | null;
  options: (string | number)[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  const stringValue =
    value !== undefined && value !== null ? value.toString() : "";

  return (
    <Grid2>
      <Typography variant="subtitle1">{label}:</Typography>
      <FormControl fullWidth>
        <RadioGroup row>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              value={option.toString()}
              control={<Radio />}
              checked={stringValue === option.toString()}
              onChange={(event: React.SyntheticEvent) =>
                onChange(event as React.ChangeEvent<HTMLInputElement>)
              }
              label={option.toString()}
              name={name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid2>
  );
};

export default NumberSelector;
