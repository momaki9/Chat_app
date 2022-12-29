import './App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Container,
  Heading,
  VStack,
  Box,
  StackDivider,
  Input
} from '@chakra-ui/react';
import Home from './pages/Home';

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
    <ChakraProvider>
      <Router>
        <div className="App">
          <Heading>
            <Container bg='blue.200' padding={'4'}>
              Welcome to instant messaging!
            </Container>
          </Heading>
          <VStack>


<form onSubmit={handleChatForm}>
  <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type something"></Input>
  <button type='submit'>Add</button>
</form>
</VStack>
          <VStack
            divider={<StackDivider borderColor='green.200' />}
            spacing={4}
            align='stretch'
          >
            <Box h={'40px'} padding='4'>
              {
                chat.map((message) => (
                  <li className='list'>Message: {message}</li>
                ))
              }
            </Box>
          </VStack>

        </div>
        <Routes>
          <Route
            path='/home'
            element={<Home />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
