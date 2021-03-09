import ChatListCard from './ChatListCard'

export default function ChatList(props) {
  const { chats, activeChat, userName } = props
  const chat = chats && chats[activeChat]

  // console.log("props: ", props)
  // console.log("chats: ", chats)

  const currentUser = chat?.people.filter((person, index) => person.person.username === userName)
  const userAvatar = currentUser && currentUser[0].person.avatar
  const user = currentUser && currentUser[0].person.first_name + " " + currentUser[0].person.last_name.substring(0, 1)

  // const readLastMessage = () => {
  //   let readLastMessage = true
  //   chat.people.forEach(chat_person => {
  //       if(userName === chat_person.person.username) {
  //           readLastMessage = chat.last_message.id === chat_person.last_read
  //       }
  //   })
  //   return readLastMessage
  // }

  const renderChats = () => {
    if (chats) {
      return (chats && Object.keys(chats).map((chat, index) => {
        if (!chat)
          return (
            <div className="no-chats" key={`chat_${index}`}>
              No Chats
            </div>
          );
        // console.log("chats: ", Object.keys(chats))
        // console.log("Active chat: ", activeChat)
        return <ChatListCard key={chat.id} props={chats} currentChat={chat} activeChat={activeChat} />;
      }))
    }
  }

  return (
    <div className="left-panel">
      <div className="user-info">
        <img src={userAvatar} alt="" className="user-avatar"/>
        <div className="user-firstname">{user}</div>
        <div className="user-username">{`@${userName}`}</div>
      </div>
      <div className="conversations-container">
        <div className="conversations-header">
          <div className="conversations-title"></div>
          <div className="conversations-add-form"></div>
        </div>
        <div className="conversations-list">
          {renderChats()}
        </div>
      </div>
    </div>
  )
}
