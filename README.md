# AI-Powered Chatbot 

 AI-powered chat platform built with Next.js, React, LangChain, Google Gemini, and MongoDB. It provides instant answers, support, and information to users through a conversational interface.


## Features

- **AI Chatbot**: Uses Google Gemini via LangChain for intelligent, context-aware responses.

- **Contextual Answers**: Loads website information from a text file and uses it as context for the AI.

- **Chat History**: Stores all user and AI messages in MongoDB.
- **Modern UI**: Built with React and Next.js, featuring a modal chat interface.

- **API Routes**: RESTful endpoints for message handling.

- **Environment Variables**: Secure API keys and DB credentials via `.env`.

---

## Technologies Used

- **Next.js** (App Router)
- **React** (Functional Components, Hooks)
- **LangChain.js** (Prompt templates, document loaders)
- **Google Gemini** (LLM via `@langchain/google-genai`)
- **MongoDB** (Mongoose ODM)
- **TypeScript**
- **Axios** (for HTTP requests)
- **Lucide React** (icons)

---

## Project Structure

```
src/
  app/
    api/
      messages/
        route.ts         # API route for chat messages (GET, POST)
    layout.tsx
    page.tsx
  components/
    chat-modal.tsx       # Chat modal UI and logic
    chat-message.tsx     # Individual chat message component
    home-component.tsx   # Home page with chat trigger
  lib/
    gemini.ts            # AI logic: loads context, builds prompt, calls Gemini
    mongodb.ts           # MongoDB connection logic
    text.txt             # Website info/context for the AI
    types.ts             # TypeScript types (e.g., Message)
    utils.ts             # Utility functions
  schemas/
    message.ts           # Mongoose schema/model for chat messages
```

---

## Application Flow

1. **User Interaction**
   - User clicks the chat button on the homepage (`home-component.tsx`).
   - The chat modal (`chat-modal.tsx`) opens, displaying previous messages (fetched from `/api/messages`).

2. **Sending a Message**
   - User submits a message in the chat modal.
   - The frontend sends a POST request to `/api/messages` with the user's message.

3. **API Handling (`route.ts`)**
   - The API route receives the message.
   - Saves the user message to MongoDB.
   - Calls `geminiResponse` (in `gemini.ts`) to generate an AI reply.

4. **AI Response (`gemini.ts`)**
   - Loads website context from `text.txt`.
   - Builds a prompt using `PromptTemplate` (LangChain).
   - Sends the prompt and user message to Google Gemini via LangChain.
   - Cleans the AI response and returns it.

5. **Storing and Returning AI Message**
   - The AI response is saved to MongoDB.
   - Both user and AI messages are returned to the frontend and displayed in the chat modal.

---

## Setup 

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd my-app
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root:
     ```
     GOOGLE_API_KEY=your-google-gemini-api-key
     MONGODB_URL=your-mongodb-connection-string
     ```

4. **Run the development server**
   ```sh
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

---

## Notes

- **Context File**: Edit `src/lib/text.txt` to update the information the AI uses for context.


---



**Made with using Next.js, LangChain, and Google Gemini**