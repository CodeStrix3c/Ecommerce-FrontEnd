import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaTwitter,
  FaWhatsapp,
  FaTimes,
  FaLinkedin,
} from "react-icons/fa";

function SharePopUp({ onClose, placeData }) {
  const shareOptions = [
    {
      icon: <FaLink className="w-6 h-6 text-gray-700" />,
      label: "Copy Link",
      linkTo: placeData.linkTo,
    },
    // { icon: <FaEnvelope className="w-6 h-6 text-red-500" />, label: "Email", linkTo: placeData.linkTo },

    {
      icon: <FaWhatsapp className="w-6 h-6 text-[#25D366]" />,
      label: "WhatsApp",
      linkTo: placeData.linkTo,
    },
    {
      icon: <FaInstagram className="w-6 h-6 text-[#E4405F]" />,
      label: "Instagram",
      linkTo: placeData.linkTo,
    },
    {
      icon: <FaFacebook className="w-6 h-6 text-[#1877F2]" />,
      label: "Facebook",
      linkTo: placeData.linkTo,
    },
    {
      icon: <FaTwitter className="w-6 h-6 text-black" />,
      label: "Twitter",
      linkTo: placeData.linkTo,
    },
    {
      icon: (
        <FaLinkedin className="w-6 h-6 text-[#0A66C2] hover:opacity-80 cursor-pointer" />
      ),
      label: "LinkedIn",
      linkTo: placeData.linkTo,
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-overlay)] z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-[480px] bg-[var(--color-white)] rounded-2xl shadow-lg relative mx-2 sm:mx-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-[var(--color-black-hover)] transition"
        >
          <FaTimes className="text-[var(--color-black)] w-5 h-5" />
        </button>

        <p className="font-bold mx-6 mt-6 text-2xl text-center sm:text-left">
          Share the Product
        </p>

        <div className="p-4 sm:p-6">
          {/* Info Section */}
          <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
              src={placeData.photos[0]}
              alt={placeData.title}
            />
            <div className="flex flex-col text-[var(--color-black)] text-center sm:text-left flex-1">
              <p className="font-semibold text-lg sm:text-xl">
                {placeData.title}
              </p>
              <p className="text-xs mt-2 font-normal">
                {placeData.description}
              </p>
            </div>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
            {shareOptions.map(({ icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center justify-center w-full py-3 border border-[var(--color-black)] rounded-xl hover:bg-[var(--color-black-hover)] transition text-[var(--color-black)] text-center"
              >
                <span className="text-2xl sm:text-3xl mb-1">{icon}</span>
                <p className="text-xs sm:text-sm font-medium">{label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharePopUp;
