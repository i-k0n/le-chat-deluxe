import { useState } from 'react'
import axios from 'axios'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const authObject = { 
      'project-ID': process.env.REACT_APP_CHATENGINE_PROJECT_ID, 
      'User-Name': username, 
      'User-Secret': password 
    }

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject })

      localStorage.setItem('le-chat-deluxe-username', username)
      localStorage.setItem('le-chat-deluxe-password', password)

      window.location.reload()
    } catch (error) {
      setError('Incorrect credentials, please try again.')
    }
  }

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start Chatting</span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>

      </div>
      
    </div>
  )
}
