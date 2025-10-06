import React, { useState } from "react";
import { Box, Divider, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ReviewHeader from "../components/ReviewHeader";
import ReviewForm from "../components/ReviewForm";
import ReviewProductInfo from "../components/ReviewProductInfo";
import ReviewActions from "../components/ReviewActions";

export default function ReviewPopup({ isOpen, onClose, product }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Description:", description);
    console.log("Files:", files);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-[var(--color-white)] rounded-[var(--radius)] w-full max-w-md sm:max-w-lg p-4 sm:p-6 shadow-lg animate-popin relative">
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography sx={{ textAlign: "center", fontWeight: 500, mb: 2, fontSize: { xs: "1rem", sm: "1.125rem" } }}>
          Write Review
        </Typography>

        {/* Banner */}
        <ReviewHeader />

        {/* Product Info */}
        <ReviewProductInfo
          product={product}
          rating={rating}
          hoverRating={hoverRating}
          setRating={setRating}
          setHoverRating={setHoverRating}
        />

        <Divider sx={{ mb: 3 }} />

        {/* Review Form */}
        <ReviewForm
          description={description}
          setDescription={setDescription}
          files={files}
          setFiles={setFiles}
        />

        {/* Actions */}
        <ReviewActions onClose={onClose} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
