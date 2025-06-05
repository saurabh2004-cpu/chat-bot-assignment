"use client"

import { useState } from "react"
import ChatModal from "./chat-modal"
import { MessageCircle } from "lucide-react"


export default function HomeComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Welcome to Our Platform</h1>
        <p className="text-lg text-center mb-12 text-gray-600">
          This is a demo of a Next.js application with a chat feature. Click the chat button in the bottom right to
          start a conversation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Feature {item}</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-50"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
      <ChatModal isOpen={isChatOpen} onClose={toggleChat} />
    </main>
  )
}
