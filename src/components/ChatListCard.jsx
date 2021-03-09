// import daySinceSent from '../utilities/dateToString'

export default function ChatListCard({ props, currentChat, activeChat}) {
  const chat = props[currentChat]

  // console.log("ChatList Props: ", chat)
  // console.log("current chat: ", currentChat)
  // console.log("active chat: ", activeChat)
  // chat.id
  // chat.title
  // chat.last_message.text
  // chat.created

  // parse last message time
  function daySinceSent(date) {
    if (!date) return ''
    const day = date.substr(8,2)
    const month = date.substr(5,2)
    const year = date.substr(0,4)
    const sent = new Date(`${month} ${day} ${year}`).toString()
    return sent.substr(4, 6)
  }

  let lastMessage = chat?.last_message?.text
  if (!lastMessage) {
      lastMessage = chat?.last_message?.attachments.length > 0 ?
      `${chat?.last_message?.attachments.length} image${chat?.last_message?.attachments.length > 1 ? 's' : ''}` :
      'Say hello!'
  }

  // check if current chat card is the currently selected chat
  const isActiveChat = parseInt(currentChat) === parseInt(activeChat)

  return (
    <div className={`conversation-container${isActiveChat ? ' active' : ''}`}>
      <div className="conversation-content">
        <div className="conversation-avatar"></div>
        <div className="conversation-info-container">
          <div className="conversation-title">{chat?.title}</div>
          <div className="conversation-last-message">{lastMessage}</div>
        </div>
      </div>
      <div className="conversation-relative-time">{daySinceSent(chat.created)}</div>
    </div>
  )
}
