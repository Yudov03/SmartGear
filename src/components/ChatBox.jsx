import { useState, useRef, useEffect } from "react";
import ChatIcon from "./ChatIcon";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Danh sách tin nhắn (không xoá tin cũ)
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Bạn cần giúp gì?" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  // Ref để khóa sendMessage, tránh gửi 2 tin nhắn liên tiếp do event bị gọi 2 lần
  const isSendingRef = useRef(false);
  // Ref lưu timeout của bot để đảm bảo bot chỉ gửi 1 tin phản hồi
  const replyTimeoutRef = useRef(null);

  // Hàm cuộn xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Lắng nghe sự kiện keydown toàn cục để tắt chatbox khi nhấn ESC
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleGlobalKeyDown);
    }
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen]);

  const sendMessage = (text) => {
    if (isSendingRef.current) return;
  
    isSendingRef.current = true;
  
    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
  
    setTimeout(() => {
      isSendingRef.current = false;
    }, 0);
  
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = null;
    }
  
    replyTimeoutRef.current = setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: "Cảm ơn bạn, chúng tôi sẽ phản hồi sớm!",
      };
      setMessages((prev) => [...prev, botReply]);
      replyTimeoutRef.current = null;
    }, 1000);
  };
  
  
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      
      // Lấy input hiện tại rồi gọi sendMessage với input đó
      const currentInput = input.trim();
      if (currentInput !== "") {
        sendMessage(currentInput); // Gửi input hiện tại
        setInput("");              // Xoá ngay input
      }
    }
  };
  

  return (
    <div className="fixed bottom-[30px] right-[20px] z-50">
      {isOpen ? (
        <div className="w-[350px] h-[500px] bg-white rounded-[15px] shadow-xl flex flex-col overflow-hidden">
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
            {/* Thẻ này giúp cuộn xuống cuối */}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#56D3C7]"
            />
            <button
              onClick={sendMessage}
              className="bg-[#56D3C7] border-none text-white px-4 py-2 rounded-[15px] hover:bg-[#3BAFA2] transition-all text-sm"
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
