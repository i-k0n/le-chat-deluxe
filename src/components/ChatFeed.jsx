import ChatHeader from './ChatHeader'
import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

export default function ChatFeed(props) {
  const { chats, activeChat, userName, messages } = props

  // console.log("feed props", props)

  const chat = chats && chats[activeChat]

  // const renderReadReceipts = (message, isMyMessage) => {
  //   return chat.people.map((person, index) => person.last_read === message.id && (
  //     <div 
  //       key={`read_${index}`} 
  //       className="read-receipt"
  //       style={{
  //         float: isMyMessage ? 'right' : 'left',
  //         backgroundImage: `url(${person?.person?.avatar})`
  //       }}
  //     />
  //   ))
  // }

  const renderMessages = () => {
    const keys = Object.keys(messages)

    return keys.map((key, index) => {
      const message = messages[key]
      // if there are messages, find the last one
      const lastMessageKey = index === 0 ? null : keys[index - 1]
      // check if message is ours or not
      const isMyMessage = userName === message.sender.username

      return (
        <>
          <div key={`msg_${index}`} className={`message-block ${isMyMessage ? 'mine' : 'theirs'}`}>
            {
              isMyMessage 
                ? <MyMessage message={message} /> 
                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
            }
          </div>
          {/* <div key={message.id} className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div> */}
        </>
      )
    })
  }

  renderMessages()

  if(!chat) return 'Loading...'

  return (
    <div className="chat-feed">
      <ChatHeader key="chatHeader" chat={chat} />
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm key="messageForm" {...props} chatId={activeChat} />
      </div>
    </div>
  )
}
