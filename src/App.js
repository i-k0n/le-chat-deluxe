import './App.css';
import { ChatEngine } from 'react-chat-engine'

function App() {
  return (
    <ChatEngine 
      height="100vh"
      projectID={process.env.REACT_APP_CHATENGINE_PROJECT_ID}
      userName={process.env.REACT_APP_CHATENGINE_USER_NAME}
      userSecret={process.env.REACT_APP_CHATENGINE_USER_SECRET}
    />
  );
}

export default App;
