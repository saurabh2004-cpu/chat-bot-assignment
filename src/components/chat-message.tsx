import type { Message } from "@/lib/types"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  if(!message) return null


  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p>{message.message}</p>
        <span className={`text-xs block mt-1 ${isUser ? "text-blue-200" : "text-gray-500"}`}>
          {/* {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} */}
        </span>
      </div>
    </div>
  )
}
