'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './Chatbot.module.css'
import { X, Headphones } from 'lucide-react'

export default function Chatbot() {
  const [messages, setMessages] = useState<
    { role: string; content: string; isAgent?: boolean }[]
  >([
    {
      role: 'assistant',
      content: 'Hi, I am AI Assistant 🤖, How can I help you?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isAgentMode, setIsAgentMode] = useState(false) // 是否切换到人工客服模式
  const [isAgentOnline, setIsAgentOnline] = useState(true) // 人工客服是否在线（默认在线，可后续接 API）

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [...prev, { role: 'user', content: input }])

    if (isAgentMode) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'A customer service agent will respond shortly.',
          isAgent: true,
        },
      ])
      setInput('')
      return
    }

    const aiMessages = messages.filter((msg) => !msg.isAgent)

    const requestBody = {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that can only respond to questions related to SkywardAI Open Source Community.',
        },
        ...aiMessages,
        { role: 'user', content: input },
      ],
      stream: true,
    }

    setInput('')
    setIsLoading(true)

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok || !response.body) {
      console.error('❌ AI request fail')
      setIsLoading(false)
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let accumulatedMessage = ''

    const processStream = async () => {
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (let line of lines) {
          line = line.trim()
          if (!line || !line.startsWith('data: ')) continue
          line = line.replace(/^data: /, '')

          if (line === '[DONE]') continue

          try {
            const json = JSON.parse(line)

            if (json.choices && json.choices[0]?.delta?.content) {
              accumulatedMessage += json.choices[0].delta.content

              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1]
                if (lastMessage?.role === 'assistant') {
                  return [
                    ...prev.slice(0, -1),
                    { role: 'assistant', content: accumulatedMessage },
                  ]
                } else {
                  return [
                    ...prev,
                    { role: 'assistant', content: accumulatedMessage },
                  ]
                }
              })
            }
          } catch (error) {
            console.error('❌ JSON', error)
          }
        }
      }
      setIsLoading(false)
    }

    processStream()
  }

  return (
    <div>
      {!isOpen && (
        <button className={styles.chatButton} onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {isOpen && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <span>
              {isAgentMode ? 'Live Chat Support 🧑‍💼' : 'AI Assistant 🤖'}
            </span>

            {isAgentMode && (
              <span className={isAgentOnline ? styles.online : styles.offline}>
                {isAgentOnline ? '🟢 Online' : '🔴 Offline'}
              </span>
            )}

            <button
              className={styles.agentToggle}
              onClick={() => setIsAgentMode(!isAgentMode)}>
              <Headphones size={18} />
              <span>{isAgentMode ? 'Switch to AI' : 'Live Support'}</span>
            </button>

            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className={styles.chatMessages} ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === 'user'
                    ? styles.userMessageWrapper
                    : message.isAgent
                    ? styles.agentMessageWrapper
                    : styles.botMessageWrapper
                }>
                {message.role !== 'user' && (
                  <span
                    className={
                      message.isAgent ? styles.agentAvatar : styles.botAvatar
                    }>
                    {message.isAgent ? '👨‍💼' : '🤖'}
                  </span>
                )}
                <div
                  className={
                    message.role === 'user'
                      ? styles.userMessage
                      : message.isAgent
                      ? styles.agentMessage
                      : styles.botMessage
                  }>
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={styles.botMessageWrapper}>
                <span className={styles.botAvatar}>🤖</span>
                <div className={styles.botMessage}>Thinking...</div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className={styles.chatForm}>
            <input
              className={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Please Enter..."
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={isLoading}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
