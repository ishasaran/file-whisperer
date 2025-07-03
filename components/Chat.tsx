
import { useState, FormEvent, ChangeEvent } from 'react'

export interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

interface ChatProps {
  messages: Message[]
  onSend: (msg: string) => void
}

export default function Chat({ messages, onSend }: ChatProps) {
  const [input, setInput] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <h2>Chat</h2>
      <div style={{
        border: '1px solid #ccc',
        height: 300,
        overflowY: 'auto',
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        background: '#f9f9f9'
      }}>
        {messages.map(({ id, text, sender }) => (
          <div key={id} style={{ marginBottom: 8, textAlign: sender === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: sender === 'user' ? '#0070f3' : '#eaeaea',
              color: sender === 'user' ? 'white' : 'black',
              padding: '6px 12px',
              borderRadius: 12,
              maxWidth: '70%',
              wordBreak: 'break-word'
            }}>{text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={{ flexGrow: 1, padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '10px 16px' }}>
          Send
        </button>
      </form>
    </div>
  )
}
