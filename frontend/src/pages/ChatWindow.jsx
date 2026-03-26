import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import API from "../api/axios.js";

const ChatWindow = ({ selectedUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const socketRef = useRef(null);
  const scrollRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDateHeader = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // CONNECT SOCKET
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.emit("addUser", user._id);

    return () => socketRef.current.disconnect();
  }, []);

  // LOAD MESSAGES
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const convoRes = await API.post("/chat/conversation", {
          receiverId: selectedUser._id,
        });
        const conversationId = convoRes.data._id;
        const msgRes = await API.get(`/chat/message/${conversationId}`);
        setMessages(msgRes.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedUser) fetchMessages();
  }, [selectedUser]);

  // SOCKET LISTENERS
  useEffect(() => {
    const socket = socketRef.current;

    const handleMessage = (data) => {
      if (data.senderId === selectedUser._id) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("getMessage", handleMessage);
    socket.on("typing", () => setTyping(true));
    socket.on("stopTyping", () => setTyping(false));

    return () => {
      socket.off("getMessage", handleMessage);
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [selectedUser]);

  // AUTO SCROLL
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const convoRes = await API.post("/chat/conversation", {
        receiverId: selectedUser._id,
      });
      const conversationId = convoRes.data._id;

      const res = await API.post("/chat/message", { conversationId, text });
      const savedMsg = res.data;

      socketRef.current.emit("sendMessage", {
        senderId: user._id,
        receiverId: selectedUser._id,
        text: savedMsg.text,
      });

      setMessages((prev) => [...prev, savedMsg]);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  // Group by date
  const groupedMessages = messages.reduce((acc, msg) => {
    const dateKey = new Date(msg.createdAt).toDateString();
    acc[dateKey] = acc[dateKey] || [];
    acc[dateKey].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full bg-[#efeae2]">
      {/* HEADER */}
      <div className="flex items-center gap-3 p-3 border-b bg-[#f0f2f5] shadow-sm">
        <button onClick={onBack} className="text-gray-600 hover:text-black text-xl">
          ←
        </button>
        <img
          src={selectedUser.image || "/default-avatar.png"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-black">{selectedUser.username}</p>
          <p className="text-sm text-gray-500">
            {typing ? "typing..." : "Online"}
          </p>
        </div>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
        {Object.entries(groupedMessages).map(([dateKey, msgs]) => (
          <div key={dateKey}>
            <div className="flex justify-center my-4">
              <span className="bg-[#e1f5fe] text-black text-xs px-4 py-1 rounded-full shadow">
                {formatDateHeader(dateKey)}
              </span>
            </div>

            {msgs.map((msg, i) => {
              const isOwn = msg.sender === user._id;
              const time = formatTime(msg.createdAt || Date.now());

              return (
                <div
                  key={msg._id || i}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-1.5`}
                >
                  <div
                    className={`relative max-w-[75%] px-4 pt-2 pb-6 rounded-lg shadow text-[15px] leading-5 break-words
                      ${isOwn 
                        ? "bg-[#fc370f] rounded-br-none" 
                        : "bg-white rounded-bl-none text-black"}`}
                  >
                    {msg.text}

                    {/* Timestamp - positioned bottom-right with padding to avoid overlap */}
                    <span className="absolute bottom-1 right-2 text-[11px] text-gray-400 opacity-80">
                      {time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div ref={scrollRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 border-t bg-[#f0f2f5] flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            socketRef.current.emit("typing", {
              senderId: user._id,
              receiverId: selectedUser._id,
            });
          }}
          onBlur={() =>
            socketRef.current.emit("stopTyping", {
              senderId: user._id,
              receiverId: selectedUser._id,
            })
          }
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-5 py-2.5 text-base outline-none focus:ring-1 focus:ring-green-400 bg-white text-black"
        />
        <button
          onClick={handleSend}
          className="bg-[#fc560f] hover:bg-[#008f6f] text-white px-5 py-2.5 rounded-full font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;