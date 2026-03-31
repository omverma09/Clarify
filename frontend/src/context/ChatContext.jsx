import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const baseURL = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
import API from "../api/axios";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const token = localStorage.getItem("token");

    // CONNECT SOCKET
    useEffect(() => {
        if (!token) return;

        const newSocket = io(baseURL, {
            auth: { token }
        });

        setSocket(newSocket);

        return () => newSocket.close();
    }, [token]);

    // RECEIVE MESSAGE
    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (msg) => {
            setMessages((prev) => {
                if (!Array.isArray(prev)) return [msg];
                return [...prev, msg];
            });
        });
        console.log(messages);

        return () => socket.off("newMessage");
    }, [socket]);

    // GET CONVERSATIONS
    const fetchConversations = async () => {
        const res = await API.get("/chat/conversations");
        setConversations(res.data.conversations);
    };

    // GET MESSAGES
    const fetchMessages = async (userId) => {
        const res = await API.get(`/chat/messages/${userId}`);
        setMessages(res.data.messages);
    };

    // SEND MESSAGE
    const sendMessage = (receiverId, message) => {
        socket.emit("sendMessage", { receiverId, message });
    };

    return (
        <ChatContext.Provider
            value={{
                conversations,
                messages,
                selectedUser,
                setSelectedUser,
                fetchConversations,
                fetchMessages,
                sendMessage
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};