import { Bot, SendHorizonal, Scaling, XIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import MessageMapper from "./ai_chat_mapper.jsx";

function AiChat({ setIsOpen }) {
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!message.trim()) return;
      setMessage("");
      setMessages((prev) => [...prev, { content: message, role: "user" }]);

      // setTimeout(() => {
      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       content: `Simulation http://localhost:5173/libros/detalles/46`,
      //       role: "ai",
      //     },
      //   ]);
      // }, 1000);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages((prev) => {
        return [...prev, { content: data.message, role: "ai" }];
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <header className="bg-white p-4 text-black font-bold flex justify-between rounded-t-lg border-b-1 border-gray-300">
        <div>
          <Bot size={30} className="inline mr-2" />
          AI Chat
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-black font-bold p-2 rounded-full"
            onClick={() => setExpanded(!expanded)}
          >
            <Scaling size={16} />
          </button>
          <button
            className="text-black font-bold p-2 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <XIcon size={16} />
          </button>
        </div>
      </header>
      <main
        className={`${expanded ? "p-4 min-h-[500px] min-w-[450px]" : "p-4 min-h-[400px] min-w-[350px]"} max-w-[200px] transition-all duration-300 overflow-y-auto  text-black max-h-[400px] overflow-x-hidden`}
      >
        <MessageMapper toMap={messages} />
        <div ref={bottomRef} />
      </main>
      <footer className="p-2">
        <form className="flex" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex justify-between w-full items-center">
            <input
              type="text"
              placeholder={`${loading ? "Waiting for the AI response..." : "Type your message..."}`}
              className={`w-full px-4 py-2 bg-gray-100 transition-all duration-300 resize-none ${message ? "rounded-l-full" : "rounded-full"} text-black outline-none
              ${loading ? "opacity-50 pointer-events-none" : ""}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            <button
              className={`flex items-center justify-center transition-all duration-300 rounded-full
                 ${message ? " bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-l-none rounded-r-full ease-in-out" : "opacity-0 pointer-events-none w-0"} `}
            >
              <SendHorizonal size={22} />
            </button>
          </div>
        </form>
      </footer>
    </section>
  );
}

export default AiChat;
