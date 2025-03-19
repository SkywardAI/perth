'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './chatbot.module.css'
import { X, Headphones } from 'lucide-react'

export default function Chatbot() {
  const [messages, setMessages] = useState<
    {
      role: string
      content: string
      isAgent?: boolean
      isExpanded?: boolean
      references?: { name: string; url: string }[]
      thinkingProcess?: string
    }[]
  >([
    {
      role: 'assistant',
      content: 'Hi, I am AI Assistant 🤖, How can I help you?',
      thinkingProcess: '',
    },
  ])

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isAgentMode, setIsAgentMode] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAgentOnline, setIsAgentOnline] = useState(true)
  const [showReferences, setShowReferences] = useState(false)
  const [enableWebSearch, setEnableWebSearch] = useState(false)
  const [theme, setTheme] = useState('light')

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      )
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev.filter((msg) => msg.content.trim() !== ''),
      { role: 'user', content: input.trim() },
    ])

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

    const requestBody = {
      model: 'gpt-4',
      messages: [...messages, { role: 'user', content: input }],
      stream: true,
      enableWebSearch,
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

    const processStream = async () => {
      let accumulatedMessage = ''
      let thinkingProcess = ''
      let isThinkingProcess = true
      let buffer = ''

      const tempMessage = {
        role: 'assistant',
        content: '',
        thinkingProcess: '',
        isExpanded: true,
      }

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
              const content = json.choices[0].delta.content

              if (isThinkingProcess && content.includes('###THINKING-END###')) {
                isThinkingProcess = false
                thinkingProcess = thinkingProcess
                  .replace('###THINKING-END###', '')
                  .trim()
              } else if (isThinkingProcess) {
                thinkingProcess += content
              } else {
                accumulatedMessage += content
              }

              tempMessage.thinkingProcess = thinkingProcess.trim()
              tempMessage.content = accumulatedMessage.trim()
            }
          } catch (error) {
            console.error('❌ JSON', error)
          }
        }
      }
      setMessages((prev) => [...prev, { ...tempMessage }])
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
        <div
          className={`${styles.chatContainer} ${
            theme === 'dark' ? 'dark' : ''
          }`}>
          <div className={styles.chatHeader}>
            <span className={styles.chatHeaderTitle}>
              {isAgentMode ? 'Live Chat Support 🧑‍💻' : 'AI Assistant 🤖'}
            </span>

            {isAgentMode ? (
              <span
                className={`${styles.agentStatus} ${
                  isAgentOnline ? styles.online : styles.offline
                }`}>
                {isAgentOnline ? '🟢 Online' : '🔴 Offline'}
              </span>
            ) : (
              <button
                className={styles.searchToggleButton}
                onClick={() => setEnableWebSearch(!enableWebSearch)}>
                {enableWebSearch ? '🔍 Web Search: ON' : '🔍 Web Search: OFF'}
              </button>
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

          <button
            className={styles.referencesToggle}
            onClick={() => setShowReferences(!showReferences)}>
            📚 {showReferences ? 'Hide References' : 'Show References'}
          </button>

          <div className={styles.chatMessages} ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div key={index}>
                {message.thinkingProcess &&
                  !messages.some(
                    (m, i) =>
                      i < index && m.thinkingProcess === message.thinkingProcess
                  ) && (
                    <div className={styles.botMessageWrapper}>
                      <span className={styles.botAvatar}>🤖</span>
                      <div className={styles.botMessage}>
                        <button
                          className={styles.expandButton}
                          onClick={() => {
                            setMessages((prev) =>
                              prev.map((msg, i) =>
                                i === index
                                  ? { ...msg, isExpanded: !msg.isExpanded }
                                  : msg
                              )
                            )
                          }}>
                          {message.isExpanded
                            ? '🔽 Hide Thinking'
                            : '🔍 Show Thinking'}
                        </button>

                        {message.isExpanded && (
                          <div className={`${styles.thinkingProcess} show`}>
                            <strong>Thinking Process:</strong>
                            <div>{message.thinkingProcess}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {message.content &&
                  !messages.some(
                    (m, i) => i < index && m.content === message.content
                  ) && (
                    <div
                      className={
                        message.role === 'user'
                          ? styles.userMessageWrapper
                          : styles.botMessageWrapper
                      }>
                      {message.role === 'assistant' && (
                        <span className={styles.botAvatar}>
                          {message.isAgent ? '👨‍💼' : '🤖'}
                        </span>
                      )}
                      <div
                        className={
                          message.role === 'user'
                            ? styles.userMessage
                            : styles.botMessage
                        }>
                        <div className={styles.finalAnswer}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  )}
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
