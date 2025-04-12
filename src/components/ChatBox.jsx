import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatIcon from "./ChatIcon";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Bạn cần giúp gì?" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  const isSendingRef = useRef(false);
  const replyTimeoutRef = useRef(null);

  // Hàm cuộn xuống cuối tin nhắn
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

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
    if (isSendingRef.current || isBotTyping) return;

    isSendingRef.current = true;
    setIsBotTyping(true);

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    // Reset sending flag ngay sau khi gửi tin người dùng
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

        const replyText = response.data.reply?.trim();
        const formattedReply = `🤖 Bot: ${
          replyText && replyText !== "." ? replyText : sampleReply
        }`;

        const botReply = { sender: "bot", text: formattedReply };

        setMessages((prev) => [...prev, botReply]);
      } catch (error) {
        console.error("Error calling bot API:", error);
        const errorReply = {
          sender: "bot",
          text: "❗ Có lỗi xảy ra, vui lòng thử lại sau!",
        };
        setMessages((prev) => [...prev, errorReply]);
      } finally {
        setIsBotTyping(false);
        replyTimeoutRef.current = null;
      }
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const currentInput = input.trim();
      if (currentInput !== "" && !isBotTyping) {
        sendMessage(currentInput);
        setInput("");
      }
    }
  };

  const handleSendClick = () => {
    const currentInput = input.trim();
    if (currentInput !== "" && !isBotTyping) {
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
            {isBotTyping && (
              <div className="text-gray-400 italic text-sm animate-pulse">Bot đang trả lời...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isBotTyping}
              className="flex-1 border rounded-[15px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#56D3C7] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendClick}
              disabled={isBotTyping}
              className={`${
                isBotTyping ? "bg-gray-300 cursor-not-allowed" : "bg-[#56D3C7] hover:bg-[#3BAFA2]"
              } border-none text-white px-4 py-2 rounded-[15px] transition-all text-sm`}
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
