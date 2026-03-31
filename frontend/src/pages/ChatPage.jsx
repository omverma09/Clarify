import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatProvider, useChat } from "../context/ChatContext.jsx";
import ChatSidebar from "../components/Chatcomponent/ChatSidebar.jsx";
import ChatWindow from "../components/Chatcomponent/ChatWindow.jsx";

const ChatLayout = () => {
    const { userId } = useParams();
    const [showChat, setShowChat] = useState(false);

    const {
        selectedUser,
        setSelectedUser,
        fetchMessages
    } = useChat();

    useEffect(() => {
        const loadUser = async () => {
            if (!userId) return;

            try {
                const res = await API.get(`/users/chat/${userId}`);
                const user = res.data.user;

                setSelectedUser(user);
                fetchMessages(user._id);
                setShowChat(true);
            } catch (err) {
                console.error("User fetch error", err);
            }
        };

        loadUser();
    }, [userId]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        fetchMessages(user._id);
        setShowChat(true);
    };

    const handleBack = () => {
        setShowChat(false);
    };

    return (
        <div className="h-screen flex overflow-hidden bg-white mt-5 ml-5">

            {/* SIDEBAR (Chat List) */}
            <div className={`w-full md:w-[350px] border-r bg-white flex flex-col 
                ${showChat ? "hidden md:flex" : "flex"}`}>
                <ChatSidebar onUserSelect={handleUserSelect} />
            </div>

            {/* CHAT WINDOW */}
            <div className={`flex-1 flex flex-col overflow-hidden bg-[#e5ddd5]
                ${showChat ? "flex" : "hidden md:flex"}`}>

                {selectedUser ? (
                    <ChatWindow onBack={handleBack} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 md:hidden">
                        No chat selected
                    </div>
                )}
            </div>

            {/* Optional: Agar koi chat nahi selected hai desktop pe */}
            {!selectedUser && (
                <div className="hidden md:flex flex-1 items-center justify-center bg-[#e5ddd5] text-gray-500">
                    Select a chat to start messaging
                </div>
            )}

        </div>
    );
};

const ChatPage = () => (
    <ChatProvider>
        <ChatLayout />
    </ChatProvider>
);

export default ChatPage;