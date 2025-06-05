import { NextResponse } from "next/server"
import type { Message } from "@/lib/types"
import dbConnect from "@/lib/mongodb";
import MessageModel from "@/schemas/message";
import { geminiResponse } from "@/lib/gemini";

export async function GET() {
  await dbConnect();
  try {
    // const messages = await db.collection("messages").find({}).sort({ timestamp: 1 }).toArray()
    const messages = await MessageModel.find().sort({ timestamp: 1 })

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages found" })
    }


    return NextResponse.json({ success: true, messages }, { status: 200 })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { message: message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message message is required" }, { status: 400 })
    }

    // Create user message
    const userMessage: Message = {
      message,
      sender: "user",
    }

    // store user message in to db
    const userMessageResponse = await MessageModel.create(userMessage)

    if (!userMessageResponse) {
      return NextResponse.json({ error: "Failed to save user message" }, { status: 500 })
    }

    // AI response
    const aiResponse = await geminiResponse(message)

    if (!aiResponse) {
      return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 })
    }

    // add AI message to database
    const aiMessage: Message = {
      message: aiResponse,
      sender: "ai",
    }

    const aiResponseMessage = await MessageModel.create(aiMessage)

    if (!aiResponseMessage) {
      return NextResponse.json({ error: "Failed to save AI response" }, { status: 500 })
    }

    return NextResponse
      .json({
        success: true,
        userMessage: userMessageResponse,
        aiResponse: aiResponseMessage,
      }, { status: 200 })

  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
