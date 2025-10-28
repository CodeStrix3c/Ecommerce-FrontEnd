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
} from "@mui/icons-material";

function SharePopUp({ onClose, title = "Ziraat", subtitle = "Ziraat connects farmers and investors through smart farming tools and sustainable agriculture solutions." }) {
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
      <div className="w-full max-w-[480px] bg-[var(--color-white)] rounded-2xl shadow-lg relative mx-2 sm:mx-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-[var(--color-black-hover)] transition"
        >
          <Close className="text-[var(--color-black)] w-5 h-5" />
        </button>

        <div className="p-4 sm:p-6">
          {/* Info Section */}
          <div className="flex flex-col sm:flex-row items-center mb-6 gap-4">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20"
              src="/assets/images/ziraat.png"
              alt={title}
            />
            <div className="flex flex-col text-[var(--color-black)] text-center sm:text-left flex-1">
              <p className="font-semibold text-lg sm:text-xl">{title}</p>
              <p className="mt-2 text-sm sm:text-base text-[var(--color-black)]">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4">
            {shareOptions.map(({ icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 border border-[var(--color-black)]/20 rounded-xl hover:bg-[var(--color-black-hover)] transition text-[var(--color-black)]"
              >
                <span className="text-2xl sm:text-xl">{icon}</span>
                <p className="text-xs sm:text-sm font-medium text-center break-words">
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
