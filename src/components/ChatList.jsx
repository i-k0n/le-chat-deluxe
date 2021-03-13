import { useState } from 'react'
import ChatListCard from './ChatListCard'
import { newChat } from 'react-chat-engine'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatList(props) {
  const [value, setValue] = useState('')
  const [showAddChatForm, setShowAddChatForm] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { chats, activeChat, userName, onChatClick } = props
  const chat = chats && chats[activeChat]

  // console.log("props: ", props)
  // console.log("chats: ", chats)

  const currentUser = chat?.people.filter((person, index) => person.person.username === userName)
  const userAvatar = currentUser && currentUser[0].person.avatar
  const user = currentUser && currentUser[0].person.first_name + " " + currentUser[0].person.last_name.substring(0, 1)

  

  const sortChats = chats ? Object.values(chats) : []
    sortChats.sort((a, b) => { 
      const aDate = a.last_message.created ? new Date(a.last_message.created) : new Date(a.created)
      const bDate = b.last_message.created ? new Date(b.last_message.created) : new Date(b.created)
      return new Date(bDate) - new Date(aDate); 
  })

  // console.log(sortChats)

  const renderChats = () => {
    // return (chats && Object.keys(chats).map((chat, index) => {
    return sortChats && sortChats.map((chat, index) => {
      if (!chat) return <div key={`chat_${chat.id}`} />
    
      // console.log("chats: ", Object.keys(chats))
      return <ChatListCard key={chat.id} props={props} chats={sortChats} currentChat={chat.id} activeChat={activeChat} onChatClick={onChatClick} />;
    })
  }

  const toggleAddChatForm = () => {
    setShowAddChatForm(!showAddChatForm)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = value.trim()

    // send props with credentials, new chat title, and an empty callback
    if (text.length > 0) newChat(props, { title: value }, () => {})

    setValue('')
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <div className="left-panel">
      <div className="user-info">
        <img src={userAvatar} alt="" className="user-avatar"/>
        <div className="user-firstname">{user}</div>
        <div className="user-username">{`@${userName}`}</div>
      </div>
      <div className="conversations-container">
        <div className="conversations-list-header">
          <div className="conversations-title">Conversations</div>
            <motion.button
              className={`conversations-add-toggle`}
              onClick={() => setIsOpen(!isOpen)}
              animate={isOpen ? "down" : "up"}
              variants={{
                down: { rotate: 0 },
                up: { rotate: -180}
              }}
              transition={{ duration: 0.15, ease: "linear" }}
            >
              <ExpandMoreRoundedIcon className="conversations-add-toggle-icon" />
            </motion.button>
        </div>
        <AnimatePresence>
        {isOpen && 
        <motion.div 
          key="add-form"
          className="conversations-add-form-container"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: .15, type: "tween", ease: "circOut" }}
        >
          <form 
            key="add-form" 
            className="conversations-add-form" 
            onSubmit={handleSubmit}
          >
            <input type="text" className="conversations-add-input" placeholder="Enter chat title..." onChange={handleChange} />
            <button type="submit" className="conversations-add-button"><AddCircleIcon /></button>
          </form>
        </motion.div>}
        </AnimatePresence>
        <div className="conversations-list">
          {renderChats()}
        </div>
      </div>
    </div>
  )
}
