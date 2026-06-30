"use client";
import Chat from "@/components/chats/Chat";
import ChatUserList from "@/components/chats/ChatUserList";
import Sidebar from "@/components/chats/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/"); // Redirect to login page
    } else {
      setTimeout(() => {
        if (isMounted) {
          setIsAuthenticated(true);
        }
      }, 0);
    }
    return () => {
      isMounted = false;
    };
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-medium">Loading Chats</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex overflow-hidden">
      <Sidebar />
      <ChatUserList />
      <Chat />
    </div>
  );
};

export default ChatPage;
