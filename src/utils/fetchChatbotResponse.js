import { getUserInfo } from "./getUserInfo";
import { v4 as uuidv4 } from "uuid";

export const fetchChatbotResponse = async (query) => {
  const { userId, userKey } = getUserInfo();
  const response = await fetch(
    `http://localhost:3000/api/v1/chat/${userKey || uuidv4()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_CHAT_API_KEY,
      },
      body: JSON.stringify({ query, userId }),
    }
  );
  if (!response.ok) throw new Error("Failed to fetch chatbot response");

  const chatText = await response.text();
  const cleaned = chatText
    .replace(/```json?/g, "")
    .replace(/```/g, "")
    .trim();
  const chatData = await JSON.parse(cleaned);
  return chatData || "Sorry, an error occurred.";
};
