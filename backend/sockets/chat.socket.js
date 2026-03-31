import Message from '../models/chat.model.js';
import Conversation from '../models/conversation.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const onlineUsers = new Set();

export const initializeSocket = (io) => {

  // AUTH MIDDLEWARE
  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(' ')[1];

    if (!token) return next(new Error('Authentication error'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  // CONNECTION
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId} | Socket ID: ${socket.id}`);

    // Join personal room
    socket.join(socket.userId);

    // Add to online users
    onlineUsers.add(socket.userId);
    io.emit('onlineUsers', Array.from(onlineUsers));

    // SEND MESSAGE (REAL-TIME)
    socket.on('sendMessage', async (data) => {
      const { receiverId, message } = data;

      // Validation
      if (!receiverId || !message?.trim()) return;
      if (!mongoose.Types.ObjectId.isValid(receiverId)) return;
      if (message.length > 1000) return;

      try {
        // Create message
        const newMessage = new Message({
          sender: socket.userId,
          receiver: receiverId,
          message: message.trim()
        });

        await newMessage.save();

        // Create or Update Conversation
        let conversation = await Conversation.findOne({
          participants: { $all: [socket.userId, receiverId] }
        });

        if (!conversation) {
          conversation = await Conversation.create({
            participants: [socket.userId, receiverId]
          });
        }

        conversation.lastMessage = newMessage._id;
        await conversation.save();

        // Populate message
        const populatedMessage = await Message.findById(newMessage._id)
          .populate('sender', 'name username avatar')
          .populate('receiver', 'name username avatar')
          .lean();

        // Emit to BOTH users
        io.to(socket.userId).emit('newMessage', populatedMessage);
        io.to(receiverId).emit('newMessage', populatedMessage);

      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('messageError', { message: 'Failed to send message' });
      }
    });

    // MARK AS READ
    socket.on('markAsRead', async ({ senderId }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(senderId)) return;

        await Message.updateMany(
          {
            sender: senderId,
            receiver: socket.userId,
            isRead: false
          },
          { isRead: true }
        );

        // Notify sender
        io.to(senderId).emit('messagesRead', {
          by: socket.userId
        });

      } catch (error) {
        console.error('Mark as read error:', error);
      }
    });

    // TYPING INDICATOR
    socket.on('typing', ({ receiverId }) => {
      if (!mongoose.Types.ObjectId.isValid(receiverId)) return;

      io.to(receiverId).emit('typing', {
        from: socket.userId
      });
    });

    // DISCONNECT
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);

      onlineUsers.delete(socket.userId);
      io.emit('onlineUsers', Array.from(onlineUsers));
    });
  });
};