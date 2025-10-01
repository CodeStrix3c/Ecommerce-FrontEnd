import React from "react";

function HarvestBottom({ boxes, workers }) {
  return (
    <div className="mt-4">
      <hr className="w-full h-[3px] bg-[var(--color-primary)] mb-2" />
      <div className="flex justify-around w-full text-sm text-[var(--color-black)]">

       <div>
         <p className="text-center font-semibold text-[16px] text-[var(--color-primary)]">{boxes}</p>
            <p> Boxes </p>
       </div>
        <div>
            <p className="text-center font-semibold text-[16px] text-[var(--color-primary)]">{workers} </p>
            <p> Workers</p>
        </div>
      </div>
    </div>
  );
}

export default HarvestBottom;
