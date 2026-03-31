import Message from "../models/chat.model.js";

export const getMessages = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const { userId } = req.params;
        const currentUserId = req.user.id;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId }
            ]
        })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('sender', 'name avatar email')
            .populate('receiver', 'name avatar email')
            .lean();
        res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages',
            error: error.message
        });
    }
};

// Get list of all conversations (for sidebar - recent chats)
export const getConversations = async (req, res) => {
    try {
        const currentUserId = req.user.id;   // Make sure your protect middleware sets req.user.id

        if (!currentUserId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const messages = await Message.find({
            $or: [{ sender: currentUserId }, { receiver: currentUserId }]
        })
            .sort({ createdAt: -1 })
            .populate('sender', 'name avatar email username')   // added username for safety
            .populate('receiver', 'name avatar email username')
            .lean();   // lean() is fine here

        const conversationsMap = new Map();

        messages.forEach((msg) => {
            // Safety check - agar sender ya receiver undefined/null hai to skip karo
            if (!msg.sender || !msg.receiver) {
                return;   // skip this corrupted message
            }

            const senderId = msg.sender._id?.toString();
            const receiverId = msg.receiver._id?.toString();

            const otherUser = senderId === currentUserId.toString()
                ? msg.receiver
                : msg.sender;

            // Double safety check
            if (!otherUser || !otherUser._id) {
                return;
            }

            const key = otherUser._id.toString();

            // Sirf latest message rakhna hai (duplicate avoid)
            if (!conversationsMap.has(key)) {
                conversationsMap.set(key, {
                    otherUser: {
                        _id: otherUser._id,
                        name: otherUser.name || otherUser.username,
                        username: otherUser.username,
                        avatar: otherUser.avatar || otherUser.image,
                        email: otherUser.email
                    },
                    lastMessage: msg.message || "",
                    lastMessageTime: msg.createdAt,
                    unread: !msg.isRead && receiverId === currentUserId.toString()
                });
            }
        });

        const conversations = Array.from(conversationsMap.values())
            .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)); // latest first

        res.status(200).json({
            success: true,
            conversations
        });
    } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch conversations",
            error: error.message
        });
    }
};

// Mark as Read.
export const markAsRead = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.id;

        await Message.updateMany(
            { sender: userId, receiver: currentUserId, isRead: false },
            { isRead: true }
        );

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
