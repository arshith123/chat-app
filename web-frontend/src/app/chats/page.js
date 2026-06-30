import Chat from "@/components/chats/Chat";
import ChatUserList from "@/components/chats/ChatUserList";
import Sidebar from "@/components/chats/Sidebar";

const ChatPage = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Sidebar />
      <ChatUserList />
      <Chat />
    </div>
  );
};

export default ChatPage;
