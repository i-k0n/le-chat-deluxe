import React from 'react'

export default function TheirMessage({ lastMessage, message }) {
  // get boolean value if this is the first message by the user
  const isFirstMessageByUser = !lastMessage || lastMessage?.sender?.sender?.username !== message?.sender?.username
  const timestamp = new Date(message.created)
  const options = {
    hour: "2-digit", 
    minute: "2-digit"
  }
  
  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        // if this is the first message by a user, we need to show their avatar
        <div 
          className="message-avatar"
          style={{ backgroundImage: `url(${message?.sender?.avatar})` }}
        />
      )}
      {message?.attachments?.length > 0
          ? (
            <img 
              src={message.attachments[0].file}
              alt="message-attachment"
              className="message-image"
              style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
            />
          ) : (
            // add margins based on if the user avatar is already present from a previous message
            <div className="message-content theirs">
              <div className="message-meta">
                <span className="message-sender">{message.sender.first_name}</span>
                <span className="message-timestamp">{timestamp.toLocaleString("en-US", options)}</span>
              </div>
              <div className="message">
                {message.text}
              </div>
            </div>
          )
      }
    </div>
  )
}
