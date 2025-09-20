"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Zap, User, Brain, Sparkles, Circle } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function LifeAIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      })

      if (!response.ok) {
        throw new Error("Falha na requisição")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Verifique se a API está rodando.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen geometric-bg neural-grid">
      <div className="border-b border-primary/20 backdrop-blur-xl bg-black/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center life-glow">
                  <Brain className="w-6 h-6 text-black font-bold" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full pulse-green"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  LifeAI
                </h1>
                <p className="text-sm text-muted-foreground">Inteligência Artificial Evolutiva</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Circle className="w-2 h-2 fill-primary text-primary" />
                <span className="text-xs text-primary font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8 h-[calc(100vh-200px)]">
          <div className="col-span-3 space-y-6">
            <Card className="holographic-border bg-card/50 backdrop-blur-sm p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Status Neural</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processamento</span>
                    <span className="text-primary">98.7%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full w-[98.7%]"></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="holographic-border bg-card/50 backdrop-blur-sm p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Conversas</span>
                </div>
                <div className="text-2xl font-bold text-primary">{messages.length}</div>
                <p className="text-xs text-muted-foreground">Mensagens processadas</p>
              </div>
            </Card>
          </div>

          <div className="col-span-9 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center life-glow">
                      <Brain className="w-12 h-12 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-black" />
                    </div>
                  </div>
                  <div className="space-y-4 max-w-md">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      Olá! Sou a LifeAI
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Uma inteligência artificial evolutiva pronta para transformar suas ideias em realidade. Como posso
                      ajudar você hoje?
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-6 message-float ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-secondary to-muted"
                          : "bg-gradient-to-br from-primary to-primary/60 life-glow"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-5 h-5 text-foreground" />
                      ) : (
                        <Brain className="w-5 h-5 text-black" />
                      )}
                    </div>

                    <Card
                      className={`max-w-[75%] p-6 holographic-border ${
                        message.role === "user" ? "bg-secondary/50 backdrop-blur-sm" : "bg-card/50 backdrop-blur-sm"
                      }`}
                    >
                      <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
                        <Circle className="w-1 h-1 fill-primary text-primary" />
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </Card>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex gap-6 message-float">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center life-glow">
                    <Brain className="w-5 h-5 text-black" />
                  </div>
                  <Card className="bg-card/50 backdrop-blur-sm holographic-border p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">LifeAI está processando</span>
                      <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-primary/20 pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem para a LifeAI..."
                    disabled={isLoading}
                    className="h-14 bg-input/50 backdrop-blur-sm border-primary/20 focus:border-primary/50 focus:ring-primary/20 text-base px-6 holographic-border"
                  />
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black font-semibold life-glow"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Pressione Enter para enviar • Shift + Enter para nova linha • Powered by LifeAI Neural Network
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
