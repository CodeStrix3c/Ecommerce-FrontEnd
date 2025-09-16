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
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-overlay)] z-50">
      {/* Card */}
      <div className="w-[90%] md:w-[500px] bg-[var(--color-white)] rounded-2xl shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-[var(--color-black-hover)] transition"
        >
          <Close className="text-[var(--color-black)]" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-xl font-semibold text-[var(--color-black)] mb-6">
            Share this place
          </h1>
          {/* Preview Section */}
          <div className="flex items-center mb-6 gap-4">
            <img
              className="w-20 h-20 rounded-lg object-cover"
              src="imgs/52a6957f-d4e1-4255-9b5f-f9ef5fc35785.avif"
              alt="Preview"
            />
            <div className="flex flex-col text-[var(--color-black)]">
              <p className="font-semibold text-sm">
                Rental unit in Bangalore Urban
              </p>

              <div className="flex items-center gap-2 mt-1 text-[var(--color-black)]/80 text-sm font-medium">
                <StarRounded className="w-4 h-4 text-[var(--color-black)]" />
                <span>4.81</span>
                <span>· 1 bedroom</span>
                <span>· 1 bed</span>
                <span>· 1 bathroom</span>
              </div>
            </div>
          </div>
          {/* Share Options */}
          <div className="grid grid-cols-3 gap-4">
            {shareOptions.map(({ icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center justify-center gap-2 p-4 border border-[var(--color-black)]/20 rounded-xl hover:bg-[var(--color-black-hover)] transition"
              >
                <span className="text-[var(--color-black)]">{icon}</span>
                <p className="text-sm font-medium text-[var(--color-black)] text-center">
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
