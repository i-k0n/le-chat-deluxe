import generalAvatar from '../assets/general-avatar.png'

export default function ChatListCard({ props, chats, currentChat, activeChat, onChatClick }) {
  const chat = chats.find(chat => chat.id === parseInt(currentChat))

  // console.log("card props: ", props)

  // get Avatar link
  const getPersonObj = chat?.people.find(person => person.person.first_name === chat.title)
  let getAvatar = getPersonObj && getPersonObj.person.avatar
  if (!getAvatar) {
    if (chat?.title === "General") {
      getAvatar = generalAvatar
    }
  }

  // check if user has read the latest message from the chat
  const readLastMessage = (chatId) => {
    // default to true
    let readLastMessage = true
    // loop through people
    // console.log("chatId: ", chatId, "props.chats[currentChat]", props.chats[chatId])
    props.chats[chatId].people.forEach(chat_person => {
        // if current person is the same as the current user
        // console.log("if: (props.username) ", props.userName, " === (chat_person.person.username) ", chat_person.person.username, props.userName === chat_person.person.username)
        if(props.userName === chat_person.person.username) {
            // check their last message id vs person's last read message
            readLastMessage = chat.last_message.id === chat_person.last_read
            // console.log(props.chats[currentChat].title, readLastMessage)
        }
    })
    console.log(props.chats[currentChat].title, readLastMessage)
    return readLastMessage
  }

  // parse last message time
  function daySinceSent(date) {
    if (!date) return ''
    const day = date.substr(8,2)
    const month = date.substr(5,2)
    const year = date.substr(0,4)
    const sent = new Date(`${month} ${day} ${year}`).toString()
    return sent.substr(4, 6)
  }
  
  // show last message in chat list card
  let lastMessage = chat?.last_message?.text
  if (!lastMessage) {
      lastMessage = chat?.last_message?.attachments.length > 0 ?
      `${chat?.last_message?.attachments.length} image${chat?.last_message?.attachments.length > 1 ? 's' : ''}` :
      'Say hello!'
  }

  // check if current chat card is the currently selected chat
  const isActiveChat = parseInt(currentChat) === parseInt(activeChat)

  return (
    <div className={`conversation-container${isActiveChat ? ' active' : ''}`} onClick={() => onChatClick(chat.id)} >
      <div className="conversation-content">
        <img className="conversation-avatar" src={getAvatar} alt={getPersonObj?.first_name || chat?.title} />
        <div className="conversation-info-container">
          <div className="conversation-title">
            {chat?.title}
            {!readLastMessage(chat.id) && <div className="conversation-unread" />}
          </div>
          <div className="conversation-last-message">{lastMessage}</div>
        </div>
      </div>
      <div className="conversation-relative-time">{daySinceSent(chat?.created)}</div>
    </div>
  )
}
