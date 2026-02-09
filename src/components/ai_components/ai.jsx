import { Popover } from "antd";
import { Bot } from "lucide-react";
import { useState } from "react";
import AiChat from "./ai_chat";

function AiBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="fixed bottom-9 right-10 z-50">
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          if (open) setIsOpen(true);
        }}
        content={<AiChat setIsOpen={setIsOpen} />}
        placement="topLeft"
        trigger="click"
        styles={{ body: { padding: 0 } }}
      >
        <div
          className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 cursor-pointer shadow-lg transition-transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bot size={30} className="text-white" />
        </div>
      </Popover>
    </section>
  );
}

export default AiBubble;
