import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { TextLoader } from "langchain/document_loaders/fs/text";

// const { PromptTemplate } = require("@langchain/core/prompts");
// const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
// const { TextLoader } = require("langchain/document_loaders/fs/text");


export const geminiResponse = async (message:string) => {

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: process.env.GOOGLE_API_KEY
  });


  //load text from text.txt
  const loader = new TextLoader(
    "src/lib/text.txt"
  );

  const text = await loader.load();
  // console.log("text", text[0].pageContent);
  const fileContent = text[0].pageContent;

  const prompt = new PromptTemplate({
    template: `You are ChatWise, an AI-powered chatbot assistant for this website. 
      Your job is to help users by answering their questions accurately and clearly, using the provided context when relevant.
      Always be polite, professional, and concise.
      Context:
      {context}

      User: {input}
      Assistant:
    `,

    inputVariables: ["context", "input"],
  });

  const chain = prompt.pipe(model);
  const result = await chain.invoke({
    context: fileContent,
    input: message,
  });

  // console.log("gemini replay", result.content);

  return result.content.toString().trim().replace(/\n/g, "")
}

// // geminiResponse("hey ")


