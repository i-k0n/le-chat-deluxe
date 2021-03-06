import React, { useState } from 'react'
import { sendMessage, isTyping } from 'react-chat-engine'
import { PhotoRounded, PublishRounded } from '@material-ui/icons/';

export default function MessageForm(props) {
  const [value, setValue] = useState('')
  const { chatId, creds } = props

  const handleSubmit = (e) => {
    e.preventDefault()

    const text = value.trim()

    if (text.length > 0) sendMessage(creds, chatId, { text })

    setValue('')
  }

  const handleChange = (e) => {
    setValue(e.target.value)

    isTyping(props, chatId)
  }

  const handleUpload = (e) => {
    sendMessage(creds, chatId, { files: e.target.files, text: '' })
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input 
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PhotoRounded />
        </span>
        <input 
          type="file"
          multiple={false}
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <button type="submit" className="send-button"><PublishRounded /></button>
      </label>
    </form>
  )
}
