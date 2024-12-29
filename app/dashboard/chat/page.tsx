"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

const mockTrends = [
  { id: 1, name: "AI in Healthcare" },
  { id: 2, name: "Sustainable Fashion" },
  { id: 3, name: "Smart Home Devices" },
]

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function Chat() {
  const [selectedTrends, setSelectedTrends] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Message[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chatHistory])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() === "") return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content: `Here's some insight about ${selectedTrends.join(", ")}: [AI-generated content would go here]`,
        timestamp: new Date(),
      }
      setChatHistory((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6">
      {/* Trend Selection */}
      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Select Trends</CardTitle>
          <CardDescription>Choose the trends you want to discuss</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {mockTrends.map((trend) => (
              <div key={trend.id} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={`trend-${trend.id}`}
                  checked={selectedTrends.includes(trend.name)}
                  onCheckedChange={(checked) => {
                    setSelectedTrends((prev) =>
                      checked ? [...prev, trend.name] : prev.filter((t) => t !== trend.name)
                    )
                  }}
                />
                <label htmlFor={`trend-${trend.id}`}>{trend.name}</label>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Section */}
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
          <CardDescription>Discuss selected trends with AI</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-4">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
                <div className={`flex items-start ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{msg.role === "user" ? "U" : "AI"}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`mx-2 p-3 rounded-lg ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="text-xs opacity-50">{msg.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </ScrollArea>

          {/* Fixed Input Field */}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 mt-4 border-t pt-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow"
            />
            <Button type="submit" className="flex items-center space-x-1">
              <Send className="w-4 h-4" />
              <span>Send</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
