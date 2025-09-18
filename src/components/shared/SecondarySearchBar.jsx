import { Search } from 'lucide-react'
import React from 'react'

function SecondarySearchBar() {
  return (
    <div>
             <div className=" px-2  flex items-center bg-white/70 backdrop-blur-sm border-[0.2px]  rounded-full shadow-sm overflow-hidden max-w-lg mx-auto ">
          <input
            type="text"
            placeholder="Search for a city..."
            className="flex-1 px-3 py-3 text-sm outline-none bg-transparent"
          />
          <button className="bg-[var(--color-secondary)] text-white p-2 hover:bg-[var(--color-secondary-hover)] transition rounded-full">
            <Search size={20} />
          </button>
        </div> 
    </div>
  )
}

export default SecondarySearchBar