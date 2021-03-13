import './App.css';
import { ChatEngine } from 'react-chat-engine'

import LoginForm from './components/LoginForm'
import ChatList from './components/ChatList'
import ChatFeed from './components/ChatFeed'
import ChatSettings from './components/ChatSettings'

function App() {
  // if we don't have login credentials in localStorage, show Login form instead
  if (!localStorage.getItem('le-chat-deluxe-username')) return <LoginForm />

  return (
    <ChatEngine 
      height="100vh"
      projectID={process.env.REACT_APP_CHATENGINE_PROJECT_ID}
      userName={localStorage.getItem('le-chat-deluxe-username')}
      userSecret={localStorage.getItem('le-chat-deluxe-password')}
      renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      renderChatSettings={(chatAppProps) => <ChatSettings {...chatAppProps} />}
    />
  );
}

export default App;
