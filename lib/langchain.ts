import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const gptModal = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  maxOutputTokens: 2048,
})