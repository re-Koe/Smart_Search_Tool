import { Step, Stepper, StepLabel } from "@mui/material";

interface CircularProgressBarProps {
  currentStep: number;
}

const CircularProgressBar = ({ currentStep }: CircularProgressBarProps) => {
  const stepLabels: string[] = [
    "Set Subject",
    "Select Comparables",
    "Analyze",
    "Estimate",
  ];

  return (
    <Stepper
      activeStep={currentStep - 1}
      alternativeLabel
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 0,
        width: "100%",
        maxWidth: "auto",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {stepLabels.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CircularProgressBar;
