import ReactMarkdown from "react-markdown";
import { Alert, Box, Button, Input, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../lib/store";
import { addMessage, resetMessages } from "../lib/messageSlice";
import { useApi } from "../lib/ApiContext";

const url = import.meta.env.VITE_API_URL;

const Chat = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");
  const { getPlaceDetailsByCurrentPlaces } = useApi();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    dispatch(addMessage({ role: "user", parts: input }));
    setInput("");

    const context = getPlaceDetailsByCurrentPlaces();

    try {
      const response = await fetch(`${url}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context, history: messages, message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data: { response: string } = await response.json();
      dispatch(addMessage({ role: "model", parts: data.response }));
    } catch (error) {
      console.error(error);
      dispatch(
        addMessage({ role: "model", parts: "Error: Could not send message." }),
      );
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        height: "90vh",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "400",
            marginBottom: "4px",
            textAlign: "center",
          }}
        >
          Live Assistant
        </Typography>
        <Alert severity="error" sx={{ marginY: 2 }}>
          Our assistant uses generative AI, and may respond with incorrect
          information.
        </Alert>
        <hr style={{ border: "0.25px solid #e7e7e7", margin: "0" }} />
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch(resetMessages())}
          sx={{ marginTop: "10px" }}
        >
          Reset Chat
        </Button>
      </Box>
      <Box
        ref={chatBoxRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "auto",
          flexGrow: 1,
          justifyContent: "flex-start",
          paddingTop: "10px",
          maxHeight: "775px",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: msg.role === "user" ? "#3b82f6" : "#e0e0e0",
              padding: "10px",
              paddingInline: "15px",
              borderRadius: "20px",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              color:
                msg.role === "user" ? "white !important" : "black !important",
            }}
          >
            <ReactMarkdown>{msg.parts}</ReactMarkdown>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <Input
          placeholder="Write your message"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          endAdornment={
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={{
                marginRight: -6,
                scale: 0.8,
                borderRadius: "20px",
                padding: "5px",
              }}
            >
              ➤
            </Button>
          }
          sx={{
            borderRadius: "50px",
            paddingRight: "50px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Chat;
