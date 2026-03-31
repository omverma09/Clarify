import { useNavigate } from "react-router-dom";

const MessageBtn = ({ userId }) => {
  const navigate = useNavigate();

  const handleMessage = () => {
    if (!userId) {
      alert("User ID not found!");
      return;
    }
    navigate(`/chat/${userId}`);
  };

  return (
    <button
      onClick={handleMessage}
      className="px-6 py-2 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-100 transition flex items-center gap-2"
    >
      💬 Message
    </button>
  );
};

export default MessageBtn;