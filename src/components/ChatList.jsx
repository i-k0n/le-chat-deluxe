export default function ChatList(props) {
  const { chats, activeChat, userName} = props
  const chat = chats && chats[activeChat]

  const currentUser = chat?.people.filter((person, index) => person.person.username === userName)
  const userAvatar = currentUser && currentUser[0].person.avatar
  const user = currentUser && currentUser[0].person.first_name + " " + currentUser[0].person.last_name.substring(0, 1)

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
          Chat List
        </div>
      </div>
    </div>
  )
}
