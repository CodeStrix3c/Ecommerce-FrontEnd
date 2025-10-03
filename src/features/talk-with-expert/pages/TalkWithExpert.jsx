import React, { useState } from "react";
import { Phone, Mail, MessageCircle, Bot, Video } from "lucide-react";

// Expanded expert list
const sampleExperts = [
  {
    id: 1,
    name: "Dr. Asha Patel",
    title: "Crop Protection Specialist",
    tags: ["Pesticides", "IPM", "Field Trials"],
    rating: 4.8,
    phone: "+91 98765 43210",
    email: "asha.patel@example.com",
    avatar: "https://i.pravatar.cc/150?img=32",
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
    avatar: "https://i.pravatar.cc/150?img=12",
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
    avatar: "https://i.pravatar.cc/150?img=18",
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
    avatar: "https://i.pravatar.cc/150?img=45",
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
    avatar: "https://i.pravatar.cc/150?img=65",
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
    avatar: "https://i.pravatar.cc/150?img=66",
    bio: "Guides farmers in organic methods and certification.",
  },
];

function ExpertCard({ expert, onOpenChat }) {
  return (
    <div className="   rounded-2xl p-4 flex flex-col gap-4">
      <div className="flex gap-4 items-start">
        <img
          src={expert.avatar}
          alt={expert.name}
          className="w-20 h-20 rounded-xl object-cover "
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{expert.name}</h3>
          <p className="text-sm text-[var(--color-black )]">{expert.title}</p>
          <p className="mt-2 text-sm text-[var(--color-black)]">{expert.bio}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onOpenChat(expert)}
          className="px-3 py-1 rounded-lg hover:bg-[var(--color-black-hover)]  text-[var(--color-black)] border border-lg text-sm flex items-center gap-1"
        >
          <MessageCircle className="text-[var(--color-secondary)]" size={20} />{" "}
          Chat
        </button>

        <button className="px-3 py-1 rounded-lg  border border-lg  hover:bg-[var(--color-black-hover)] text-[var(--color-black)] text-sm flex items-center gap-1 ">
          <Phone className="text-[var(--color-secondary)]" size={20} /> Call
        </button>
        <button className="px-3 py-1 rounded-lg hover:bg-[var(--color-black-hover)] text-[var(--color-black)] border border-lg text-sm flex items-center gap-1   ">
          <Mail className="text-[var(--color-secondary)]" size={20} /> Mail
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
    <div className=" bg-white fixed right-4 bottom-4 z-50 w-full max-w-md">
      <div className="  rounded-2xl shadow-xl flex flex-col h-96">
        <div className="p-3 border-b flex justify-between">
          <div className="flex items-center gap-2">
            {openChatWith.avatar ? (
              <img
                src={openChatWith.avatar}
                alt=""
                className="w-8 h-8 rounded-md"
              />
            ) : (
              <Bot className="w-6 h-6 text-[var(--color-black)]" />
            )}
            <div>
              <div className=" font-semibold text-sm">{openChatWith.name}</div>
              <div className="text-xs text-[var(--color-black)]">
                {openChatWith.title}
              </div>
            </div>
          </div>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((m) => (
            <div key={m.id} className={m.from === "you" ? "text-right" : ""}>
              <div
                className={`inline-block px-3 py-2 rounded-lg ${m.from === "you" ? " text-[var(--color-balck)]" : ""}`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 rounded-lg border px-3 py-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-3 py-2 rounded-lg text-[var(--color-black)]"
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
    <div className=" lg:mt-28 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Talk with an Expert</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {experts.map((ex) => (
            <ExpertCard key={ex.id} expert={ex} onOpenChat={setOpenChatWith} />
          ))}
        </div>

        <div className=" border border-sm rounded-2xl p-6 mt-8 text-center">
          <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
            <Video className="text-[var(--color-secondary)]" /> Join Our Webinar
          </h2>
          <p className="mt-2 text-[var(--color-black)]">
            Would you like to join our upcoming webinar? Contact us below:
          </p>
          <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <button className="px-4 py-2 rounded-lg  text-[var(--color-black)] border border-lg flex items-center gap-2">
              <Phone className="text-[var(--color-secondary)]" size={20} /> Call
            </button>
            <button className="px-4 py-2 rounded-lg text-[var(--color-black)] border border-lg flex items-center gap-2">
              <MessageCircle
                className="text-[var(--color-secondary)]"
                size={20}
              />{" "}
              WhatsApp
            </button>
            <button className="px-4 py-2 rounded-lg text-[var(--color-black)] border border-lg flex items-center gap-2 ">
              <Mail className="text-[var(--color-secondary)]" size={20} />{" "}
              Message
            </button>
          </div>
        </div>
      </div>

      <div className=" fixed right-4 bottom-10 z-50 ">
        <button
          onClick={() =>
            setOpenChatWith({ name: "AI Assistant", title: "Virtual Helper" })
          }
          className="w-14 h-14 rounded-full text-[var(--color-black)]  bg-[var(--color-secondary)] flex items-center justify-center"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>

      <ChatPanel
        openChatWith={openChatWith}
        onClose={() => setOpenChatWith(null)}
      />
    </div>
  );
}
