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
    // <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50 p-2 sm:p-4">
    //   <div className="w-full lg:w-[500px] bg-[var(--color-white)] rounded-sm shadow-lg animate-popin relative py-5  ">
    //     {/* Close Button */}
    //     <IconButton
    //       onClick={onClose}
    //       sx={{ position: "absolute", top: 8, right: 8 }}
    //     >
    //       <CloseIcon />
    //     </IconButton>

    //     {/* Title */}
    //     <Typography
    //       sx={{
    //         textAlign: "center",
    //         fontWeight: 500,
    //         mb: 2,
    //         fontSize: { xs: "1rem", sm: "1.125rem" },
    //       }}
    //     >
    //       Write Review
    //     </Typography>

    //     {/* Banner */}
    //     <div>
    //       <ReviewHeader />
    //     </div>
    //     {/* Product Info */}
    //     <div>
    //       <ReviewProductInfo
    //         product={product}
    //         rating={rating}
    //         hoverRating={hoverRating}
    //         setRating={setRating}
    //         setHoverRating={setHoverRating}
    //       />
    //     </div>

    //     <Divider sx={{ mb: 3 }} />

    //     {/* Review Form */}
    //     <div>
    //       <ReviewForm
    //         description={description}
    //         setDescription={setDescription}
    //         files={files}
    //         setFiles={setFiles}
    //       />
    //     </div>

    //     {/* Actions */}
    //     <div className="px-4 py-2">
    //       <ReviewActions onClose={onClose} handleSubmit={handleSubmit} />
    //     </div>
    //   </div>
    // </div>


    
    <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
  <div className="w-full max-w-[500px] bg-[var(--color-white)] rounded-lg shadow-xl animate-popin relative py-5 px-5 sm:px-5 my-6 sm:my-0">
    
    {/* Close Button */}
    <IconButton
      onClick={onClose}
      sx={{ position: "absolute", top: 8, right: 8 , mt:1, }}
    >
      <CloseIcon />
    </IconButton>

    {/* Title */}
    <Typography
      sx={{
        textAlign: "center",
        fontWeight: 600,
      mt:1,
        fontSize: { xs: "1.1rem", sm: "1.25rem" },
      }}
    >
      Write a Review
    </Typography>

    {/* Banner */}
    <div className="my-2">
      <ReviewHeader />
    </div>

    {/* Product Info */}
    <div className="px-1 sm:px-3">
      <ReviewProductInfo
        product={product}
        rating={rating}
        hoverRating={hoverRating}
        setRating={setRating}
        setHoverRating={setHoverRating}
      />
    </div>

    {/* <Divider sx={{ my: 3 }} /> */}

    {/* Review Form */}
    <div className="px-1 sm:px-3">
      <ReviewForm
        description={description}
        setDescription={setDescription}
        files={files}
        setFiles={setFiles}
      />
    </div>

    {/* Actions */}
    <div className="px-4 py-3 mt-2 border-t border-[var(--color-gray)] rounded-b-lg">
      <ReviewActions onClose={onClose} handleSubmit={handleSubmit} />
    </div>
  </div>
</div>

  );
}
