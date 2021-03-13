import Clock from './Clock'

export default function ChatHeader({ chat }) {
  
  return (
    <div className="chat-header-title-container">
        <div className="chat-header-title">{chat.title}</div>
        <div className="chat-header-clock">
          <Clock />
        </div>
      </div>
  )
}
