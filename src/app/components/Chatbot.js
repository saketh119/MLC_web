"use client";
import { useState, useEffect, useRef } from "react";
import chatData from "./chatData";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hey! I&apos;m Vaani, your friendly MLC assistant." },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const lower = input.toLowerCase();

    // Step 1: Keyword-based response
    let bestMatch = null;
    let bestKeywordLength = 0;
    for (const item of chatData) {
      for (const kw of item.keywords) {
        if (lower.includes(kw) && kw.length > bestKeywordLength) {
          bestMatch = item;
          bestKeywordLength = kw.length;
        }
      }
    }

    // Step 2: Show "thinking..." bubble
    setMessages((prev) => [...prev, { sender: "bot", text: "thinking..." }]);

    let response;
    if (bestMatch) {
      response = bestMatch.response;
    } else {
      // Step 3: Try Hugging Face API with 3-second timeout
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);

        const res = await fetch("https://api-inference.huggingface.co/models/distilgpt2", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: input }),
          signal: controller.signal,
        });

        clearTimeout(timeout);
        const data = await res.json();

        if (Array.isArray(data) && data[0]?.generated_text) {
          response = data[0].generated_text;
        } else {
          response = "⚠️ Sorry, Vaani couldn&apos;t generate a response.";
        }
      } catch (err) {
        console.warn("Hugging Face AI failed:", err);
        response = "⚠️ Sorry, taking too long to respond. Try again!";
      }
    }

    const finalResponses = Array.isArray(response) ? response : [response];

    // Replace "thinking..." with AI or fallback response
    setMessages((prev) => [
      ...prev.filter((msg) => msg.text !== "thinking..."),
      ...finalResponses.map((res) => ({ sender: "bot", text: res })),
    ]);
  };

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Close chat on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-[10000]"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col z-[9999]"
        >
          <div className="bg-blue-600 text-white p-3 rounded-t-2xl font-bold">
            🤖  MLC Chatbot
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 flex flex-col scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {messages.map((msg, i) => {
              const isThinking = msg.text === "thinking...";
              return (
                <div
                  key={i}
                  className={`max-w-[75%] px-4 py-2 break-words shadow-sm transform transition duration-300 ease-out animate-fade-in-up ${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-black self-start rounded-2xl"
                      : "bg-blue-600 text-white self-end rounded-2xl ml-auto"
                  }`}
                >
                  {isThinking ? (
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-400"></span>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="flex border-t bg-white">
            <input
              type="text"
              className="flex-1 p-2 text-sm border-none outline-none bg-white text-black placeholder-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" className="px-3 text-blue-600 font-bold">
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
