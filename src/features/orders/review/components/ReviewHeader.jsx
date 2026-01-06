import React from "react";
import { Box } from "@mui/material";
import { Star } from "lucide-react";

export default function ReviewHeader() {
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        borderRadius: "6px",
        mb: 2,
        // backgroundColor: "#fff4f2",
      }}
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center sm:items-start">
        
        <div>
         
          <img
            src="/assets/images/dawa.jpg"
            alt=""
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
          />
        </div>
        <div className="text-center sm:text-left">
          
          <p className="text-sm sm:text-base font-medium">
           
            Versatile Organic Potting Mix
          </p>
          <div className="flex justify-center sm:justify-start items-center gap-1 mt-1">
            {" "}
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className="text-[var(--color-secondary)] fill-[var(--color-secondary)]"
              />
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}
