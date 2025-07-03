
import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import Chat from '../components/Chat'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])

  // Dummy send message
  const sendMessage = (msg: string) => {
    setMessages((prev) => [...prev, { id: prev.length, text: msg, sender: 'user' }])
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: prev.length, text: 'Bot response: ' + msg, sender: 'bot' }])
    }, 1000)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Next.js Upload + Chat Starter (TS)</h1>
      <FileUpload />
      <Chat messages={messages} onSend={sendMessage} />
    </div>
  )
}
