import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { mapperComponents } from "./ai_chat_mapper_components";

function MessageMapper({ toMap }) {
  return (
    <section className="flex flex-col gap-2 w-full">
      {toMap.map((msg, index) => (
        <article
          key={index}
          className={`max-w-[70%] p-2 rounded-lg break-normal break-words overflow-hidden 
          ${msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto rounded-br-none" : "bg-gray-100 self-start mr-auto rounded-bl-none"}`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={mapperComponents()}
          >
            {msg.content}
          </ReactMarkdown>
        </article>
      ))}
    </section>
  );
}

export default MessageMapper;
