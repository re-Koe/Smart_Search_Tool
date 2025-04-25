import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")


def gen_message(message: str, context: dict[str, str], history: list[str]):
    history.insert(
        0,
        {
            "role": "user",
            "parts": f"""You are a helpful AI assistant trying to help the user find
              a house to buy based on the following information: {context}""",
        },
    )
    chat = model.start_chat(history=history)
    response = chat.send_message(message)
    return response.text


def sanitize_json_input(history):
    sanitized_history = []

    for entry in history:
        sanitized_entry = {}

        if isinstance(entry.get("role"), str):
            sanitized_entry["role"] = entry["role"].strip()
        else:
            raise KeyError

        if isinstance(entry.get("parts"), str):
            sanitized_entry["parts"] = entry["parts"].strip()
        else:
            raise KeyError

        sanitized_history.append(sanitized_entry)

    return sanitized_history
