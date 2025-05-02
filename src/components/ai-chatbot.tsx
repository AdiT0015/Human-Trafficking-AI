"use client";

import React, { useState } from "react";
import { aiSupportChatbot } from "@/ai/flows/ai-support-chatbot";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const AIChatbot = () => {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await aiSupportChatbot({ message: input });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: result.response },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I encountered an error." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full rounded-lg shadow-md overflow-hidden flex flex-col">
      <CardContent className="p-4 flex-grow">
        <ScrollArea className="h-[400px] mb-4">
          <div className="flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-accent text-accent-foreground self-end"
                    : "bg-secondary text-secondary-foreground self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg bg-secondary text-secondary-foreground self-start">
                Thinking...
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow mr-2 rounded-md"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
