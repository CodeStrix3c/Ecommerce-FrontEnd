import { useState, useRef, useEffect } from 'react';
import { HelpCircle, Menu, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/providers/WishListProvider';

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-3">
        <Link
          to="/sell"
          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-[#222222] shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow"
        >
          Sell on Ziraat
        </Link>

        <Link
          to="/wishlist"
          className="relative rounded-full bg-gray-100 p-2 transition-colors duration-200 hover:bg-gray-200"
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${'text-gray-600'}`}
          />
          <span
            key={wishlist.length}
            className="animate-popin absolute -right-1 -top-1 flex h-4 w-4 items-center 
               justify-center rounded-full bg-[#ff5a5f] text-[10px] font-bold
               text-white"
          >
            {wishlist.length}
          </span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-gray-100 p-2 transition-colors duration-200 hover:bg-gray-200"
        >
          <Menu size={20} />
        </button>
      </div>

      <div
        className={`absolute right-0 mt-3 w-64 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 
        transition-all duration-200 ease-out 
        ${open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-1 scale-95 opacity-0'}`}
      >
        <div className="p-2">
          <Link
            to="/help"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#222222] transition-colors duration-150 hover:bg-gray-100"
          >
            <HelpCircle size={18} className="text-gray-600" />
            <span>Help Centre</span>
          </Link>

          <hr className="my-2" />

          <Link
            to="/become-host"
            className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-gray-100"
          >
            <img
              src="https://img.icons8.com/emoji/48/house-with-garden.png"
              alt="host"
              className="h-6 w-6"
            />
            <div>
              <p className="text-sm font-semibold text-[#222222]">
                Become a host
              </p>
              <p className="text-xs text-gray-500">
                It’s easy to start hosting and earn extra income.
              </p>
            </div>
          </Link>

          <hr className="my-2" />

          <Link
            to="/refer"
            className="block rounded-lg px-3 py-2 text-sm text-[#222222] transition-colors duration-150 hover:bg-gray-100"
          >
            Refer a host
          </Link>
          <Link
            to="/co-host"
            className="block rounded-lg px-3 py-2 text-sm text-[#222222] transition-colors duration-150 hover:bg-gray-100"
          >
            Find a co-host
          </Link>
          <Link
            to="/login"
            className="block rounded-lg px-3 py-2 text-sm text-[#222222] transition-colors duration-150 hover:bg-gray-100"
          >
            Log in or sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
