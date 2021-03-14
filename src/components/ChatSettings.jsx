import { useState } from 'react'
import generalAvatar from '../assets/general-avatar.png'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatSettings(props) {
  const [isPhotosOpen, setIsPhotosOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const { chats, activeChat } = props
  const chat = chats && chats[activeChat]
  const title = chats && chat.title

  // console.log("Chat Settings props: ", props)
  // console.log("Chat Settings people: ", chat?.people)
  // console.log("Chat Settings props: ", chat)
  
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
      <div className={`chat-files-container${isPhotosOpen ? " expanded" : ""}`}>
        <div className="chat-files-header">
          <div className="chat-files-title">
            Photos
          </div>
          <motion.button
            className={`conversations-add-toggle`}
            onClick={() => setIsPhotosOpen(!isPhotosOpen)}
            animate={isPhotosOpen ? "up" : "down"}
            variants={{
              down: { rotate: 0 },
              up: { rotate: 180}
            }}
            transition={{ duration: 0.15, ease: "linear" }}
          >
            <ExpandMoreRoundedIcon className="conversations-add-toggle-icon" />
          </motion.button>
        </div>
        <AnimatePresence>
          {isPhotosOpen && (
            <motion.div 
              className="chat-files"
              key="chat-files"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: .15, type: "tween", ease: "circOut" }}
            >
              {chat && chat?.attachments.map(attachment => {
                return (
                  <div className="chat-file-container">
                    <img key={attachment.id} className="chat-file" src={attachment.file} alt="Attachment" />
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={`chat-settings-container${isSettingsOpen ? " expanded" : ""}`}>
        <div className="chat-settings-header">
          <div className="chat-settings-title">
            Settings
          </div>
          <motion.button
            className={`conversations-add-toggle`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            animate={isSettingsOpen ? "up" : "down"}
            variants={{
              down: { rotate: 0 },
              up: { rotate: 180}
            }}
            transition={{ duration: 0.15, ease: "linear" }}
          >
            <ExpandMoreRoundedIcon className="conversations-add-toggle-icon" />
          </motion.button>
        </div>
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              className="chat-delete-button-container"
              key="chat-delete"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: .15, type: "tween", ease: "circOut" }}
            >
              <button className="chat-delete-button">
                <DeleteForeverRoundedIcon style={{ marginRight: ".25rem" }} />
                Delete Conversation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
