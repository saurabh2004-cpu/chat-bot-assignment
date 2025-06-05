"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Send } from "lucide-react"
import type { Message } from "@/lib/types"
import ChatMessage from "./chat-message"
import axios from "axios"
import { Loader2 } from 'lucide-react'

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchMessages()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  //fetch messages
  const fetchMessages = async () => {
    try {
      setIsMessagesLoading(true)
      const response = await axios.get("http://localhost:3000/api/messages")

      setIsMessagesLoading(false)
      console.log(response)

      const data = response.data.messages
      setMessages(data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsMessagesLoading(false)
    }
  }

  //scroll to bottom message  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    const userMessage: Message = {
      message: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await axios.post("http://localhost:3000/api/messages", userMessage)
      console.log(response)
      const data = response.data.aiResponse


      setMessages((prev) => [...prev, data])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 md:p-0">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[500px] md:h-[600px] flex flex-col">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Chat Support</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close chat">
            <X size={20} />
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!messages ? (
            <p className="text-center text-gray-500 my-8">No messages yet. Start a conversation!</p>
          ) : (
            messages.map((message, index) => <ChatMessage key={index} message={message} />)
          )}

          {isMessagesLoading && (
            <div className="flex items-center space-x-2">
              <p className="text-gray-500">Loading previous messages...</p>
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          {isLoading && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg disabled:opacity-50"
            disabled={isLoading || !inputValue.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
