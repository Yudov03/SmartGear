import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatIcon from "./ChatIcon";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Bạn cần giúp gì?" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  const isSendingRef = useRef(false);
  const replyTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const sendMessage = async (text) => {
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
  
    replyTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await axios.post("https://your-api-url.com/chat", {
          message: text,
        });
  
        const botReply = {
          sender: "bot",
          text:
            response.data.reply ||
            "Cảm ơn bạn, chúng tôi sẽ phản hồi sớm!",
        };
  
        setMessages((prev) => [...prev, botReply]);
      } catch (error) {
        console.error("Error calling bot API:", error);
        const errorReply = {
          sender: "bot",
          text: "Có lỗi xảy ra, vui lòng thử lại sau!",
        };
        setMessages((prev) => [...prev, errorReply]);
      } finally {
        replyTimeoutRef.current = null;
      }
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const currentInput = input.trim();
      if (currentInput !== "") {
        sendMessage(currentInput);
        setInput("");
      }
    }
  };

  const handleSendClick = () => {
    const currentInput = input.trim();
    if (currentInput !== "") {
      sendMessage(currentInput);
      setInput("");
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
              onClick={handleSendClick}
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
