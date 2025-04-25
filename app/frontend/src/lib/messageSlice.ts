import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  role: "user" | "model";
  parts: string;
}

interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    resetMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, resetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
