import './App.css';
import { ChatEngine } from 'react-chat-engine'

import ChatFeed from './components/ChatFeed'
import ChatList from './components/ChatList'
import LoginForm from './components/LoginForm'

function App() {
  if (!localStorage.getItem('le-chat-deluxe-username')) return <LoginForm />

  return (
    <ChatEngine 
      height="100vh"
      projectID={process.env.REACT_APP_CHATENGINE_PROJECT_ID}
      userName={localStorage.getItem('le-chat-deluxe-username')}
      userSecret={localStorage.getItem('le-chat-deluxe-password')}
      renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
}

export default App;
