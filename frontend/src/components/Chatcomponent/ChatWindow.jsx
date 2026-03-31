import { useState, useRef, useEffect } from "react";
import { useChat } from "../../context/ChatContext.jsx";
import { useAuth } from "../../context/AuthContext .jsx";
import { ArrowBack } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const ChatWindow = ({ onBack }) => {
    const { selectedUser, messages, sendMessage } = useChat();
    const { user } = useAuth();

    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim() || !selectedUser) return;
        sendMessage(selectedUser._id, input);
        setInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Format Time → 11:37 AM
    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    // Date Separator (Today, Yesterday, 31 Mar 2026)
    const formatDateSeparator = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Group messages with date separators
    const groupedMessages = [];
    let lastDate = null;

    const sortedMessages = [...(messages || [])].sort((a, b) =>
        new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp)
    );

    sortedMessages.forEach((msg) => {
        const msgDate = new Date(msg.createdAt || msg.timestamp).toDateString();

        if (msgDate !== lastDate) {
            groupedMessages.push({
                type: "date",
                date: formatDateSeparator(msg.createdAt || msg.timestamp)
            });
            lastDate = msgDate;
        }

        groupedMessages.push({ type: "message", ...msg });
    });

    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#e5ddd5] text-gray-500">
                Select a conversation to start chatting
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden bg-[#e5ddd5]">

            {/* HEADER  */}
            <div className="flex items-center gap-3 p-5 border-b bg-white flex-shrink-0">
                <button
                    onClick={onBack}
                    className="md:hidden mr-2 text-gray-700"
                >
                    <ArrowBack fontSize="large" />
                </button>

                {user ? <img
                    src={user.image}
                    className="w-12 h-12 rounded-full"
                    /> :
                    <Avatar src={selectedUser.avatar} className="w-10 h-10" />
                }

                <div className="flex-1">
                    <p className="font-semibold text-lg text-black">{selectedUser.name}</p>
                    <p className="text-sm text-green-500">Online</p>
                </div>
            </div>

            {/* SCROLLABLE CHAT AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-[#e5ddd5] scrollbar-hide"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02), rgba(0,0,0,0.02))' }}>

                {groupedMessages.map((item, index) => {
                    if (item.type === "date") {
                        return (
                            <div key={`date-${index}`} className="flex justify-center my-5">
                                <div className="bg-white/90 px-4 py-1 rounded-full text-xs text-gray-600 shadow-sm">
                                    {item.date}
                                </div>
                            </div>
                        );
                    }

                    const msg = item;
                    const isMe = msg.sender?._id === user?._id;

                    return (
                        <div
                            key={msg._id || index}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-[15.5px] leading-relaxed ${isMe
                                    ? "bg-[#dcf8c6] rounded-br-sm text-black"
                                    : "bg-white rounded-bl-sm shadow-sm text-black"
                                    }`}
                            >
                                <p>{msg.message}</p>
                                <span className={`text-[10px] text-gray-500 mt-1 block text-right`}>
                                    {formatTime(msg.createdAt || msg.timestamp)}
                                </span>
                            </div>
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />
            </div>

            {/* FIXED INPUT AREA */}
            <div className="bg-white border-t p-3 flex-shrink-0">
                <div className="flex items-center gap-2 bg-[#f0f0f0] rounded-full px-4 py-1">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent outline-none py-3 px-2 text-[15px] text-black"
                    />

                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className={`px-6 py-2.5 rounded-full font-medium transition-all ${input.trim()
                            ? "bg-[#0084ff] text-white hover:bg-blue-600"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;