import { Call, WhatsApp, Chat } from "@mui/icons-material";
import React, { useState } from "react";

function TalkWithExpert() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="bg-transparent rounded-lg border border-gray-300 text-black p-9 mt-[150px] w-5/6 mx-auto grid grid-cols-12 gap-6 relative">

      <div className="col-span-12 md:col-span-7 pt-12">
        <b>Planting trees</b> helps combat climate change, purify the air, and provide shelter for wildlife. Trees also improve soil health, conserve water, and create a greener, healthier environment for everyone. Planting trees cleans the air, supports wildlife, and makes our environment greener and healthier.
      </div>

    
      <div className="col-span-12 md:col-span-5 grid grid-rows-3 gap-6">
        <div className="text-2xl font-semibold text-center py-3">
          
          <p>Talk to Experts Now</p>
        </div>

        <div className="text-xl font-semibold text-white rounded-lg border border-gray-300 py-3 text-center bg-[#2d6b06] flex items-center justify-center gap-2 cursor-pointer">
          <WhatsApp />
          <p>WhatsApp Experts</p>
        </div>

        <div className="text-xl font-semibold rounded-lg border border-gray-300 py-3 text-center bg-gray-50 flex items-center justify-center gap-2 cursor-pointer">
          <Call />
          <p>+91 8997882927</p>
        </div>
      </div>

      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-[#2d6b06] text-white p-4 rounded-full shadow-lg flex items-center justify-center gap-2 hover:bg-green-700"
      >
        <Chat />
        Chat AI
      </button>

   
      {isChatOpen && (
        <div className="fixed bottom-15 right-8 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          <div className="bg-[#2d6b06] text-white p-9 rounded-t-lg text-center font-semibold">
            AI Chat
          </div>
          <div className="flex-1 p-3 overflow-auto">
            <p className="text-gray-500">Hello! How can I assist you today?</p>
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-2 py-1"
            />
            <button className="bg-[#2d6b06] text-white px-3 rounded-lg">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TalkWithExpert;
