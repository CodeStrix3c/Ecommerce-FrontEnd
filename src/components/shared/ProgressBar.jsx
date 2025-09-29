// import { Box, LinearProgress, Typography, Button } from "@mui/material";

// export default function ProgressBar({ filledFields, totalFields, onClick }) {
//   const percentage =
//     totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

//   return (
//     <Box sx={{ width: "100%", mt: 2 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//         <Typography variant="body2" color="textSecondary">
//           Profile Completion
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {percentage}%
//         </Typography>
//       </Box>  

//       <LinearProgress
//         variant="determinate"
//         value={percentage}
//         sx={{
//           height: 8,
//           borderRadius: 4,
//           bgcolor: "#eee",
//           "& .MuiLinearProgress-bar": {
//             backgroundColor: "var(--color-primary)",
//           },
//         }}
//       />

//       {onClick && percentage < 100 && (
//         <Box sx={{ mt: 2 }}>
//           <Button
//             variant="outlined"
//             onClick={onClick}
//             sx={{
//               fontSize: "0.875rem",
//               padding: "6px 16px",
//               borderRadius: "6px",
//               textTransform: "none",
//             }}
//           >
//             Complete Profile
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// }


import { Box, LinearProgress, Typography, Button } from "@mui/material";

export default function ProgressBar({ filledFields, totalFields, onClick }) {
  const percentage =
    totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

  
  let percentageColor = "error.main"; 
  if (percentage >= 80) {
    percentageColor = "success.main"; 
  } else if (percentage >= 50) {
    percentageColor = "warning.main"; 
  }

  return (
    <Box
      sx={{
        width: "100%",
        mt: 3,
        p: 2.5,
        borderRadius: 3,
        bgcolor: "background.paper",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
     
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.primary" }}>
          Profile Completion
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: percentageColor }}
        >
          {percentage}%
        </Typography>
      </Box>

      
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 10,
          borderRadius: 5,
          bgcolor: "#f0f0f0",
          "& .MuiLinearProgress-bar": {
            borderRadius: 5,
            background: `linear-gradient(90deg, var(--color-primary), #6a11cb)`,
            boxShadow: "0 0 6px rgba(106,17,203,0.4)",
          },
        }}
      />

    </Box>
  );
}
