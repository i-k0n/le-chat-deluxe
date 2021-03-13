import generalAvatar from '../assets/general-avatar.png'

export default function ChatSettings(props) {
  const { chats, activeChat } = props
  const chat = chats && chats[activeChat]
  const title = chats && chat.title

  // console.log("Chat Settings props: ", props)
  console.log("Chat Settings people: ", chat?.people)
  
  // get Avatar link
  
  const getAvatar = (title) => {
    const getPersonObj = chat?.people.find(person => person.person.first_name === chat.title)
    let avatar = getPersonObj && getPersonObj.person.avatar
    // console.log("avatar: ", avatar, title)
    if (!avatar) {
      if (title === "General") {
        avatar = generalAvatar
      }
    }

    return avatar
  }

  const getParticipants = people => {
    return people && people.map(person => {
      return (
        <div key={person.person.username} className="person-container">
          <div className="person-avatar-container">
            <img src={person.person.avatar} alt={person.person.first_name} className="person-avatar"/>
            <div className={`person-online-status${person.person.is_online ? " online" : " offline"}`} />
          </div>
          <div className="person-name">{person.person.first_name}</div>
        </div>
      )
    })
  }

  return (
    <div className="right-panel">
      <div className="chat-info">
        <img src={getAvatar(title)} alt={title} className="chat-avatar"/>
        <div className="chat-title">{title}</div>
      </div>
      <div className="chat-participants-container">
        <div className="chat-participants-header">
          <div className="chat-participants-title">Participants</div>
          <div className="chat-participants-count">{chat?.people.length}</div>
        </div>
        <div className="chat-participants">
          {chat && getParticipants(chat.people)}
        </div>
      </div>
      <div className="chat-files-container">
        <div className="chat-files-header">
          <div className="chat-files-title">Photos</div>
        </div>
        <div className="chat-files">
          Files List
        </div>
      </div>
      <div className="chat-settings-container">
        <div className="chat-settings-header">
          <div className="chat-settings-title">Settings</div>
        </div>
        <button className="chat-delete-button">Delete Conversation</button>
      </div>
    </div>
  )
}
