import { useState, useEffect } from "react";
import ChatIcon from "./ChatIcon"

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Bạn cần giúp gì?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: "Cảm ơn bạn, chúng tôi sẽ phản hồi sớm!",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
    if (e.key === "Escape") setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed bottom-[30px] right-[20px] z-50">
      {isOpen ? (
        <div className="w-[350px] h-[500px] bg-white rounded-xl shadow-xl rounded-[15px] flex flex-col overflow-hidden">
          <div className="bg-[#56D3C7] text-white px-4 py-3 font-semibold flex justify-between items-center">
            <span>Chat hỗ trợ</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-[20px]">
          {messages.map((msg, index) => (
            <div
                key={index}
                className={`text-sm px-3 py-2 rounded-[15px] max-w-[80%] ${
                msg.sender === "user"
                    ? "bg-[#DCF8C6] self-end ml-auto"
                    : "bg-[#F1F1F1] border border-gray-300 self-start"
                }`}
            >
                {msg.text}
            </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#56D3C7]"
            />
            <button
              onClick={sendMessage}
              className="bg-[#56D3C7] border-none text-white px-4 py-2 rounded-[15px] rounded-lg hover:bg-[#3BAFA2] transition-all text-sm"
            >
              Gửi
            </button>
          </div>
        </div>
      ) : (
        <button
            onClick={() => setIsOpen(true)}
            className="w-[60px] h-[60px] bg-[#56D3C7] border-none rounded-full shadow-xl text-white flex items-center justify-center hover:bg-[#3BAFA2] transition-all"
            >
            <span className="text-white">
                <ChatIcon />
            </span>
        </button>

      )}
    </div>
  );
};

export default ChatBox;
