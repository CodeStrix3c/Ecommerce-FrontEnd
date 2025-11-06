import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Bot, Video, Calendar, Brain, BotIcon } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import ImageHeaderSection from "@/components/shared/ImageHeaderSection";

const sampleExperts = [
  {
    id: 1,
    name: "Dr. Asha Patel",
    title: "Crop Protection Specialist",
    tags: ["Pesticides", "IPM", "Field Trials"],
    rating: 4.8,
    phone: "+91 98765 43210",
    email: "asha.patel@example.com",
    avatar: "/assets/images/doc.png",
    bio: "10+ years advising smallholder farmers on pest management.",
  },
  {
    id: 2,
    name: "Mr. Ravi Kumar",
    title: "Soil & Fertility Expert",
    tags: ["Soil Testing", "NPK", "Compost"],
    rating: 4.6,
    phone: "+91 99876 54321",
    email: "ravi.kumar@example.com",
    avatar: "/assets/images/doc2.png",
    bio: "Specialises in soil health, nutrient budgeting and testing.",
  },
  {
    id: 3,
    name: "Ms. Nisha Singh",
    title: "Agronomy Consultant",
    tags: ["Crop Calendar", "Variety Selection"],
    rating: 4.9,
    phone: "+91 91234 56789",
    email: "nisha.singh@example.com",
    avatar: "/assets/images/doc3.png",
    bio: "Designs crop plans to maximize yield and reduce costs.",
  },
  {
    id: 4,
    name: "Mr. Ajay Mehta",
    title: "Irrigation Specialist",
    tags: ["Drip Irrigation", "Water Management"],
    rating: 4.7,
    phone: "+91 93456 78901",
    email: "ajay.mehta@example.com",
    avatar: "/assets/images/doc4.png",
    bio: "Helps optimize irrigation systems for efficiency.",
  },
  {
    id: 5,
    name: "Ms. Kavita Rao",
    title: "Agri-Tech Consultant",
    tags: ["Precision Farming", "AI Tools"],
    rating: 4.9,
    phone: "+91 92345 67890",
    email: "kavita.rao@example.com",
    avatar: "/assets/images/doc5.png",
    bio: "Advises on AI-driven solutions for farming.",
  },
  {
    id: 6,
    name: "Mr. Sunil Sharma",
    title: "Organic Farming Expert",
    tags: ["Organic", "Sustainability"],
    rating: 4.8,
    phone: "+91 93456 12345",
    email: "sunil.sharma@example.com",
    avatar: "/assets/images/doc6.png",
    bio: "Guides farmers in organic methods and certification.",
  },
];
 export const openWhatsApp = (phoneNumber, message) => {
  // detect mobile device
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // choose correct WhatsApp link
  const baseURL = isMobile
    ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  // open link in new tab or app
  window.open(baseURL, "_blank");
};

function ExpertCard({ expert, onOpenChat }) {

 
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-4 bg-[var(--color-white)] shadow-sm border hover:shadow-md transition">
      <div className="flex gap-4 items-start">
        <img
          src={expert.avatar}
          alt={expert.name}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{expert.name}</h3>
          <p className="text-sm text-[var(--color-black)]">{expert.title}</p>
          <p className="mt-2 text-sm text-[var(--color-black)]">{expert.bio}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mt-2">
        <button
          onClick={() => onOpenChat(expert)}
          className="px-3 py-1.5 rounded-lg text-[var(--color-black)] border text-sm flex items-center gap-1 transition"
        >
          <MessageCircle className="text-[var(--color-secondary)]" size={20} />
          Ask Expertise
        </button>

        <button className="px-3 py-1.5 rounded-lg border text-[var(--color-black)] text-sm flex items-center gap-1 transition">
          <Calendar className="text-[var(--color-secondary)]" size={20} />
          Appointment
        </button>

        {/* <button className="px-3 py-1.5 rounded-lg border text-[var(--color-black)] text-sm flex items-center gap-1 transition">
          <Phone className="text-[var(--color-secondary)]" size={20} />
          Call
        </button> */}

        <button className="px-3 py-1.5 rounded-lg text-[var(--color-black)] border text-sm flex items-center gap-1 transition">
          <Mail className="text-[var(--color-secondary)]" size={20} />
          Mail
        </button>
      </div>
    </div>
  );
}

function ChatPanel({ openChatWith, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "expert", text: "Hello! How can I help today?" },
  ]);
  const [input, setInput] = useState("");

  if (!openChatWith) return null;

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "you", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "expert",
          text: "Got it. Can you share more details?",
        },
      ]);
    }, 800);
  }

  return (
    <div className="sticky bottom-4 z-50 flex justify-end pr-5">
      <div className="rounded-2xl shadow-sm flex flex-col h-96 w-80 bg-[var(--color-white)] border">
        <div className="p-3 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <div className="flex items-center gap-2">

            <BotIcon/>
            
            <div>
              <div className="font-semibold text-sm">{openChatWith.name}</div>
              <div className="text-xs text-[var(--color-black)]">
                {openChatWith.title}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-sm">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((m) => (
            <div key={m.id} className={m.from === "you" ? "text-right" : ""}>
              <div
                className={`inline-block px-3 py-2 rounded-lg ${m.from === "you"
                  ? "bg-[var(--color-black-hover)] text-[var(--color-black)]"
                  : "bg-gray-100"
                  }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t flex gap-2 bg-gray-50 rounded-b-2xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 rounded-lg border px-3 py-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-3 py-2 rounded-lg bg-[var(--color-secondary)] text-[var(--color-white)] font-medium hover:opacity-90 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TalkWithExpert() {
  const [experts] = useState(sampleExperts);
  const [openChatWith, setOpenChatWith] = useState(null);

  return (
    <div className="w-full min-h-screen bg-[var(--color-white)]">


      <ContentWrapper compactScreen topSpacing>
        <div className="space-y-6">
          <h3 className=" text-3xl font-bold text[var-(--color-black)]">Talk to an expert</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {experts.map((ex) => (
              <ExpertCard key={ex.id} expert={ex} onOpenChat={setOpenChatWith} />
            ))}
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-r  border shadow-sm text-center">
            <div className="flex flex-col items-center gap-3">
              <Video className="text-[var(--color-secondary)]" size={36} />
              <h2 className="text-2xl font-semibold">Join Our Expert Webinar</h2>
              <p className="text-[var(--color-black)] max-w-lg">
                Learn directly from our agriculture experts through live webinars and Q&A
                sessions. Enhance your knowledge and connect with professionals.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {/* <button className="px-5 py-2.5 rounded-full border flex items-center gap-2 hover:bg-[var(--color-black-hover)] transition">
                  <Phone className="text-[var(--color-secondary)]" size={20} />
                  Call
                </button> */}
                <div>
                  <button
                onClick={()=>{
                  openWhatsApp(
                    "+911234578222",
                    "Hello How can i assist you today"
                  )
                }}
                 className="px-5 py-2.5 rounded-full border flex items-center gap-2 hover:bg-[var(--color-black-hover)] transition">
                  <MessageCircle className="text-[var(--color-secondary)]" size={20} />
                  WhatsApp
                </button>
                </div>
                <button className="px-5 py-2.5 rounded-full border flex items-center gap-2 hover:bg-[var(--color-black-hover)] transition">
                  <Calendar className="text-[var(--color-secondary)]" size={20} />
                  Appointment
                </button>
                <button className="px-5 py-2.5 rounded-full border flex items-center gap-2 hover:bg-[var(--color-black-hover)] transition">
                  <Mail className="text-[var(--color-secondary)]" size={20} />
                  Message
                </button>
              </div>
            </div>
          </div>


         
        </div>
         
      </ContentWrapper>
      <div className="sticky bottom-20 flex justify-end px-5">
            <button
              onClick={() =>
                setOpenChatWith({ name: "AI Assistant", title: "Virtual Helper" })
              }
              className="w-14 h-14 rounded-full text-[var(--color-white)] bg-[var(--color-secondary)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <Bot className="w-6 h-6" />
            </button>
          </div>


          {openChatWith && (
            <ChatPanel openChatWith={openChatWith} onClose={() => setOpenChatWith(null)} />
          )}
    </div>
  );
}
