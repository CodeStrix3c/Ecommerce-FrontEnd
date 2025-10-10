import {
  Close,
  Code,
  Email,
  Facebook,
  Link,
  Message,
  MessageOutlined,
  More,
  Twitter,
  WhatsApp,
  Star,
  StarRounded,
} from "@mui/icons-material";

function SharePopUp({ onClose }) {
  const shareOptions = [
    { icon: <Link />, label: "Copy Link" },
    { icon: <Email />, label: "Email" },
    { icon: <Message />, label: "Messages" },
    { icon: <WhatsApp />, label: "WhatsApp" },
    { icon: <MessageOutlined />, label: "Messenger" },
    { icon: <Facebook />, label: "Facebook" },
    { icon: <Twitter />, label: "Twitter" },
    { icon: <Code />, label: "Embed" },
    { icon: <More />, label: "More Options" },
  ];

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-overlay)] z-50 p-2 sm:p-4 overflow-y-auto">
  <div className="w-full max-w-[500px] bg-[var(--color-white)] rounded-2xl shadow-lg relative mx-2 sm:mx-0">
    <button
      onClick={onClose}
      className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 rounded-full hover:bg-[var(--color-black-hover)] transition"
    >
      <Close className="text-[var(--color-black)] w-5 h-5" />
    </button>

    <div className="p-3 sm:p-6">
      <h1 className="text-lg sm:text-xl font-semibold text-[var(--color-black)] mb-4 sm:mb-6">
        Share this place
      </h1>

      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <img
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
          src="imgs/52a6957f-d4e1-4255-9b5f-f9ef5fc35785.avif"
          alt="Preview"
        />
        <div className="flex flex-col text-[var(--color-black)] text-center sm:text-left flex-1">
          <p className="font-semibold text-sm sm:text-base truncate">
            Rental unit in Bangalore Urban
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 sm:gap-6 mt-1 text-[var(--color-black)]/80 text-xs sm:text-lg font-medium">
            <StarRounded className="w-4 h-4 text-[var(--color-black)]" />
            <span>4.81</span>
            <span>· 1 bedroom</span>
            <span>· 1 bed</span>
            <span>· 1 bathroom</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        {shareOptions.map(({ icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 sm:p-4 border border-[var(--color-black)]/20 rounded-xl hover:bg-[var(--color-black-hover)] transition text-[var(--color-black)]"
          >
            <span className="text-lg sm:text-base">{icon}</span>
            <p className="text-xs sm:text-sm font-medium text-center truncate">
              {label}
            </p>
          </button>
        ))}
      </div>
    </div>
  </div>
</div>

  );
}

export default SharePopUp;
