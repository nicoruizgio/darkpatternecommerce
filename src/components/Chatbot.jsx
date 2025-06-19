import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { fetchChatbotResponse } from "../utils/fetchChatbotResponse";


export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    if (inputRef.current) {
      inputRef.current.style.height = "2.5rem";
      inputRef.current.style.overflowY = "hidden";
    }
    try {
      const reply = await fetchChatbotResponse(trimmed);
      setMessages((msgs) => [...msgs, { sender: "ai", text: reply }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* chat button*/}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all"
        onClick={() => setOpen(true)}
        aria-label="Open chatbot"
        style={{ display: open ? "none" : "flex" }}
      >
        <MessageCircle size={28} />
      </button>

      {/* chat window*/}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[28rem] bg-white rounded-xl shadow-2xl flex flex-col animate-slide-up min-h-[40vh] h-[50vh] max-h-[80vh]">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-semibold text-gray-800">AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-[80%] text-sm whitespace-pre-line break-words ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form className="p-4 pt-0 flex flex-row items-start" onSubmit={handleSend}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
                if (e.target.scrollHeight > 128) {
                  e.target.style.overflowY = "auto";
                } else {
                  e.target.style.overflowY = "hidden";
                }
              }}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!loading && input.trim()) {
                    handleSend(e);
                  }
                }
              }}
              placeholder="Type your message..."
              rows={1}
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              style={{ minHeight: "2.5rem", maxHeight: "8rem", overflowY: "hidden" }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="ml-1 px-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              style={{ height: "2.5rem", minHeight: "2.5rem", maxHeight: "2.5rem" }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* animation */}
      <style>
        {`
          .animate-slide-up {
            animation: chatbot-slide-up 0.25s cubic-bezier(.4,0,.2,1);
          }
          @keyframes chatbot-slide-up {
            0% { transform: translateY(40px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}