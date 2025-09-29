import React from 'react'

function OrchardBottom() {
  return (
   <div className="px-3 py-2 border rounded-lg my-6">
  {/* Row 1: Summary */}
  <div>
    <h1 className="text-[var(--color-black)] text-2xl font-bold pb-2 ms-9">
      Summary
    </h1>
  </div>

  {/* Row 2: Left + Right */}
  <div className="flex justify-between">
    <div className='ms-9'>100 Total Trees</div>
    <div className='me-9'>100 Total Acres</div>
  </div>
</div>

  )
}

export default OrchardBottom
