'use client'
import React, { useState } from "react";
import { Search, MoreVertical, MessageSquare } from "lucide-react";

const ChatUserList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dummyUsers = [
    {
      id: 1,
      name: "Sarah Jenkins",
      avatarGradient: "from-pink-500 to-rose-500",
      initials: "SJ",
      isOnline: true,
      lastMessage: "Hey! Are we still meeting today?",
      time: "10:42 AM",
      unreadCount: 2,
    },
    {
      id: 2,
      name: "David Chen",
      avatarGradient: "from-blue-500 to-indigo-500",
      initials: "DC",
      isOnline: true,
      lastMessage: "The project files have been uploaded.",
      time: "9:15 AM",
      unreadCount: 0,
    },
    {
      id: 3,
      name: "Elena Rostova",
      avatarGradient: "from-purple-500 to-violet-500",
      initials: "ER",
      isOnline: false,
      lastMessage: "Thanks for the update!",
      time: "Yesterday",
      unreadCount: 0,
    },
    {
      id: 4,
      name: "Marcus Aurelius",
      avatarGradient: "from-emerald-500 to-teal-500",
      initials: "MA",
      isOnline: true,
      lastMessage: "Let's review the code design.",
      time: "Monday",
      unreadCount: 5,
    },
  ];

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-120 h-screen bg-slate-50 border-r border-slate-200 flex flex-col">
      {/* Header section */}
      <div className="p-5 bg-white border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-sky-600" size={24} />
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              Chats
            </h1>
          </div>
          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 hover:bg-slate-200/70 focus:bg-white border border-transparent focus:border-sky-500 rounded-xl outline-none text-sm text-gray-800 placeholder-slate-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 custom-scrollbar">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-3 hover:bg-white rounded-xl cursor-pointer transition-all duration-200 hover:shadow-sm border border-transparent hover:border-slate-100 group"
            >
              {/* Avatar block */}
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${user.avatarGradient} flex items-center justify-center text-white font-semibold text-sm shadow-sm transform group-hover:scale-105 transition-transform duration-200`}
                >
                  {user.initials}
                </div>
                {/* Status Dot */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                    user.isOnline ? "bg-green-500" : "bg-slate-400"
                  }`}
                />
              </div>

              {/* Message Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <h2 className="text-sm font-semibold text-gray-800 truncate group-hover:text-sky-600 transition-colors">
                    {user.name}
                  </h2>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {user.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate pr-2">
                  {user.lastMessage}
                </p>
              </div>

              {/* Badges block */}
              {user.unreadCount > 0 && (
                <div className="flex items-center justify-center min-w-5 h-5 px-1.5 bg-sky-500 text-white text-[10px] font-bold rounded-full shadow-sm animate-pulse">
                  {user.unreadCount}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center px-4">
            <p className="text-sm font-medium text-slate-500">No chats found</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for someone else</p>
          </div>
        )}
      </div>

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

export default ChatUserList;