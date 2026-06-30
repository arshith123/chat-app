'use client'
import React, { useState, useRef, useEffect } from "react";
import {
  Phone,
  Video,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  CheckCheck,
} from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Jenkins",
      text: "Hey! Are we still meeting today?",
      isSentByMe: false,
      time: "10:40 AM",
    },
    {
      id: 2,
      sender: "Me",
      text: "Yes! I will be there in about 15 minutes.",
      isSentByMe: true,
      time: "10:41 AM",
    },
    {
      id: 3,
      sender: "Sarah Jenkins",
      text: "Awesome, I'm already at the cafe. Ordered a cappuccino for myself.",
      isSentByMe: false,
      time: "10:42 AM",
    },
    {
      id: 4,
      sender: "Me",
      text: "Perfect! See you soon. ☕",
      isSentByMe: true,
      time: "10:43 AM",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      id: Date.now(),
      sender: "Me",
      text: inputText,
      isSentByMe: true,
      time: currentTime,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-white">
      {/* Chat Header */}
      <div className="h-20 px-6 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
              SJ
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500 shadow-sm" />
          </div>

          {/* User Details */}
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Sarah Jenkins
            </h2>
            <p className="text-[11px] text-green-500 font-medium">Online</p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-slate-50 rounded-full text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-4 custom-scrollbar">
        {/* Date separator */}
        <div className="flex justify-center my-4">
          <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm uppercase tracking-wider">
            Today
          </span>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isSentByMe ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm relative group transition-all duration-200 ${
                message.isSentByMe
                  ? "bg-sky-600 text-white rounded-tr-none"
                  : "bg-white text-gray-800 rounded-tl-none border border-slate-100"
              }`}
            >
              {/* Message text */}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.text}
              </p>

              {/* Time and read status */}
              <div
                className={`flex items-center justify-end gap-1.5 mt-1.5 ${
                  message.isSentByMe ? "text-sky-100" : "text-slate-400"
                }`}
              >
                <span className="text-[9px] font-medium">{message.time}</span>
                {message.isSentByMe && <CheckCheck size={12} className="text-sky-200" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input panel */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-slate-100 bg-white flex items-center gap-3"
      >
        <button
          type="button"
          className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
        >
          <Paperclip size={20} />
        </button>
        
        <button
          type="button"
          className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
        >
          <Smile size={20} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 bg-slate-100 focus:bg-white border border-transparent focus:border-sky-500 rounded-xl outline-none text-sm text-gray-800 placeholder-slate-400 transition-all duration-200"
        />

        <button
          type="submit"
          className="p-3 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white rounded-xl transition-all shadow-md shadow-sky-600/20 cursor-pointer"
        >
          <Send size={18} />
        </button>
      </form>

      {/* Embedded CSS Scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Chat;