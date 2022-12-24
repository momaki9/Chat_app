import './App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('http://localhost:4000'))
  }, []);

  return (
    <div className="App">
      <header>
        <p>
          Hello World!
        </p>
      </header>
      <form>
        <input></input>
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;
