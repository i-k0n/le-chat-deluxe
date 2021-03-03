import React from 'react'

export default function TheirMessage({ lastMessage, message }) {
  // get boolean value if this is the first message by the user
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.sender.username !== message.sender.username
  
  return (
    <div className="message-row">
      {isFirstMessageByUser && (
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
            <div className="message" style={{ float: 'right', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }} >
              {message.text}
            </div>
          )
      }
    </div>
  )
}
