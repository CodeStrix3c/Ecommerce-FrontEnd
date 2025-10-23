import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ReviewHeader from "../components/ReviewHeader";
import ReviewForm from "../components/ReviewForm";
import ReviewProductInfo from "../components/ReviewProductInfo";
import ReviewActions from "../components/ReviewActions";
import { iso } from "zod";

export default function ReviewPopup({ isOpen, onClose, product }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);


  useEffect(()=>{
    if(isOpen){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "auto";
    }


  },[isOpen])

    if (!isOpen) return null;


  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Description:", description);
    console.log("Files:", files);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="w-full lg:w-[500px] bg-[var(--color-white)] rounded-sm shadow-lg animate-popin relative py-5  ">
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 500,
            mb: 2,
            fontSize: { xs: "1rem", sm: "1.125rem" },
          }}
        >
          Write Review
        </Typography>

        {/* Banner */}
        <div>
          <ReviewHeader />
        </div>
        {/* Product Info */}
        <div>
          <ReviewProductInfo
            product={product}
            rating={rating}
            hoverRating={hoverRating}
            setRating={setRating}
            setHoverRating={setHoverRating}
          />
        </div>

        <Divider sx={{ mb: 3 }} />

        {/* Review Form */}
        <div>
          <ReviewForm
            description={description}
            setDescription={setDescription}
            files={files}
            setFiles={setFiles}
          />
        </div>

        {/* Actions */}
        <div className="px-4 py-2">
          <ReviewActions onClose={onClose} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
