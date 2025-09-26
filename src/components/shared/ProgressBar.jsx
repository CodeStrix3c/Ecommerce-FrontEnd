import { Box, LinearProgress, Typography, Button } from "@mui/material";

export default function ProgressBar({ filledFields, totalFields, onClick }) {
  const percentage =
    totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="body2" color="textSecondary">
          Profile Completion
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {percentage}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: "#eee",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "var(--color-primary)",
          },
        }}
      />

      {onClick && percentage < 100 && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={onClick}
            sx={{
              fontSize: "0.875rem",
              padding: "6px 16px",
              borderRadius: "6px",
              textTransform: "none",
            }}
          >
            Complete Profile
          </Button>
        </Box>
      )}
    </Box>
  );
}
