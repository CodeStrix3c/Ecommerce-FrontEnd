// components/review/ReviewProductInfo.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { Star } from "lucide-react";

export default function ReviewProductInfo({ product, rating, hoverRating, setRating, setHoverRating }) {
  if (!product) return null;

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      mb={2}
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: 60, height: 60, borderRadius: 4, objectFit: "cover" }}
      />
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 600, mt: { xs: 1, sm: 0 } }}>
          {product.name}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`cursor-pointer ${
                (hoverRating || rating) > i ? "text-[var(--color-primary)]" : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
