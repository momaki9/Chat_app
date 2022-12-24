import './App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setSocket(io('http://localhost:4000'));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('from-server', (data) => {
      // console.log('Message recieved from server!!', data)
      setChat((prev) => [...prev, data.message])
    })
  }, [socket])

  function handleChatForm(e) {
    e.preventDefault();
    console.log(message);
    socket.emit('send-msg', { message })
    setMessage('');
  }

  return (
    <div className="App">
      <header>
        <p>
          Hello World!
        </p>
      </header>
      <div>
        <ul>
          {
            chat.map((message) => (
              <li className='list'>TEXT: {message}</li>
            ))
          }
        </ul>
      </div>
      <form onSubmit={handleChatForm}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type something"></input>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default App;
