import Clock from './Clock'

export default function ChatHeader({ chat }) {
  
  return (
    <div className="chat-title-container">
        <div className="chat-title">{chat.title}</div>
        <div className="chat-clock">
          <Clock />
        </div>
      </div>
  )
}
