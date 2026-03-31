import { useEffect } from "react";
import { useChat } from "../../context/ChatContext.jsx";
import { Avatar } from "@mui/material";
import { useAuth } from "../../context/AuthContext .jsx";

const ChatSidebar = ({ onUserSelect }) => {     // ← onUserSelect prop receive kar rahe hain
    const { user } = useAuth();

    const {
        conversations,
        fetchConversations,
        setSelectedUser,
        fetchMessages
    } = useChat();

    useEffect(() => {
        fetchConversations();
    }, []);

    const handleSelect = (conv) => {
        const selectedUser = conv.otherUser;

        setSelectedUser(selectedUser);
        fetchMessages(selectedUser._id);

        // Mobile ke liye important: Parent ko batao ki chat open karo
        if (onUserSelect) {
            onUserSelect(selectedUser);
        }
    };

    return (
        <div className="h-full flex flex-col">

            {/* Header */}
            <div className="p-4 font-semibold border-b bg-white">
                Messages
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto bg-white">
                {Array.isArray(conversations) && conversations.length > 0 ? (
                    conversations.map((conv) => {
                        const otherUser = conv.otherUser;
                        return (
                            <div
                                key={otherUser._id}
                                onClick={() => handleSelect(conv)}
                                className="flex items-center gap-3 p-4 hover:bg-gray-100 active:bg-gray-200 cursor-pointer transition-all border-b last:border-b-0"
                            >
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <Avatar
                                        src={otherUser.avatar || otherUser.image}
                                        alt={otherUser.name}
                                        className="w-12 h-12"
                                    />
                                    {/* Online Indicator */}
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">
                                        {otherUser.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate mt-0.5">
                                        {conv.lastMessage || "No messages yet"}
                                    </p>
                                </div>

                                {/* Time */}
                                {conv.lastMessageTime && (
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {new Date(conv.lastMessageTime).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </span>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                        <p>No conversations yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;