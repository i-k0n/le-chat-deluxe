import React from 'react'

export default function MyMessage({ message }) {
  const timestamp = new Date(message.created)
  const options = {
    hour: "2-digit", 
    minute: "2-digit"
  }

  if(message?.attachments?.length > 0) {
    return (
      <img 
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: 'right' }}
      />
    )
  }
  return (
    <div className="message-content mine">
      <div className="message-meta">
        <span className="message-timestamp">{timestamp.toLocaleString("en-US", options)}</span>
      </div>
      <div className="message">
        {message.text}
      </div>
    </div>
  )
}
