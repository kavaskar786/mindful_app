import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "./Header";
import ConversationArea from "./ConversationArea";
import InputArea from "./InputArea";
import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

// Import the Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API client with the API key from environment variables
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

function Chatbot() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    document.title = "AI Counselor";
  }, []);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      setConversation((prev) => [...prev, { role: "user", content: message }]);
      setMessage("");

      try {
        // Create the prompt for the API
        const prompt = message;

        // Get the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content using the model
        const result = await model.generateContent(prompt);

        // Process the API response
        const botMessage = result.response.text() || "No response from bot.";
        setConversation((prev) => [...prev, { role: "assistant", content: botMessage }]);
      } catch (error) {
        console.error("Error sending message:", error);

        if (error.message.includes("RECITATION")) {
          setConversation((prev) => [
            ...prev,
            {
              role: "error",
              content: "Content blocked due to policy restrictions.",
            },
          ]);
        } else {
          setConversation((prev) => [
            ...prev,
            {
              role: "error",
              content: `Error communicating with the AI bot: ${error.message}`,
            },
          ]);
        }
      }
    }
  };

  return (
    <Box
      height={isSmallScreen ? window.innerHeight - 58 : window.innerHeight - 64} // Adjust height based on screen size
      display="flex"
      flexDirection="column"
      overflow="hidden"
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Header />
      <ConversationArea conversation={conversation} />
      <InputArea message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </Box>
  );
}

export default Chatbot;
