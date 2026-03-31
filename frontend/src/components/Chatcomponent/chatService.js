import API from "../../api/axios";

export const getConversations = async () => {
    const res = await API.get("/chat/conversations");
    return res.data;
};

export const getMessages = async (userId) => {
    const res = await API.get(`/chat/messages/${userId}`);
    return res.data;
};