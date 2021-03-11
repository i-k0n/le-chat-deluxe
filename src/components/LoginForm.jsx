import { useState } from 'react'
import axios from 'axios'

import logo from '../assets/le-chat-logo.png'

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
    <div className="login-container">
      <img className="login-logo" src={logo} alt="Le Chat" />
      <form onSubmit={handleSubmit}  className="login-form">
        <label className="login-text">Please enter your credentials</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" placeholder="Password" required />
          <button type="submit" className="login-button">Sign In</button>
        <h2 className="login-error">{error}</h2>
      </form>      
    </div>
  )
}
