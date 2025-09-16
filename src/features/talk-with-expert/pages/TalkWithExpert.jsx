import { Call, WhatsApp, Chat } from "@mui/icons-material";
import React, { useState } from "react";

function TalkWithExpert() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "ai" },
  ]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { text: message, sender: "user" }]);
    setMessage("");
  };

  return (
    <div className="bg-[var(--color-white)] rounded-lg border border-[var(--color-black)] p-8 lg:mt-36 w-11/12 md:w-5/6 mx-auto grid grid-cols-12 gap-6 relative text-[var(--color-black)]">
      <div className="col-span-12 md:col-span-7">
        <b>Planting trees</b> helps combat climate change, purify the air, and
        provide shelter for wildlife. Trees improve soil health, conserve water,
        and create a greener, healthier environment for everyone.
        <br />
        <br />
        Planting trees cleans the air, supports wildlife, and makes our
        environment greener and healthier.
      </div>

      <div className="col-span-12 md:col-span-5 flex flex-col gap-4 mt-6 md:mt-0">
        <div className="text-xl font-semibold text-center py-2">
          Talk to Experts Now
        </div>

        <div className="flex items-center justify-center gap-2 py-3 rounded-lg cursor-pointer transition bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)]">
          <WhatsApp />
          <p>WhatsApp Experts</p>
        </div>

        <div className="flex items-center justify-center gap-2 py-3 rounded-lg cursor-pointer border border-[var(--color-primary)] transition hover:bg-[var(--color-black-hover)]">
          <Call />
          <p>+91 8997882927</p>
        </div>
      </div>

      <button
        className="fixed bottom-8 right-8 p-3 rounded-full flex items-center justify-center gap-2 shadow-lg transition bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)]"
        onClick={toggleChat}
      >
        <Chat />
        Chat AI
      </button>

      {isChatOpen && (
        <div className="fixed bottom-20 right-8 w-80 h-96 bg-[var(--color-white)] border border-[var(--color-black)] rounded-lg shadow-lg flex flex-col text-[var(--color-black)]">
          <div className="p-3 text-center font-semibold rounded-t-lg bg-[var(--color-primary)] text-[var(--color-white)]">
            AI Chat
          </div>

          <div className="flex-1 p-3 overflow-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded ${
                  msg.sender === "ai"
                    ? "bg-[var(--color-overlay)] text-[var(--color-white)]"
                    : "bg-[var(--color-primary)] text-[var(--color-white)] self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2 border-[var(--color-black)]">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 rounded px-2 py-1 border border-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
            <button
              onClick={handleSend}
              className="px-3 rounded transition bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)]"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TalkWithExpert;
