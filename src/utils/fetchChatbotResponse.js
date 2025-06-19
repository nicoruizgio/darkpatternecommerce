import { getUserInfo } from "./getUserInfo";

export async function fetchChatbotResponse(message) {
  const { userId, userKey } = getUserInfo();
  const response = await fetch("http://localhost:3001/api/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "key": userKey || "",
      "user-id": userId || "",
    },
    body: JSON.stringify({ message, userId, userKey }),
  });
  if (!response.ok) throw new Error("Failed to fetch chatbot response");
  const data = await response.json();
  return data.reply || "Sorry, an error occurred.";
}