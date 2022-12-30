import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Chat from './pages/Chat'
import Home from './pages/Home';
import Login from './components/Login';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route 
            path='/chat'
            element={<Chat />}
          />
          <Route
            path='/'
            element={<Home />}
          />
            <Route
            path='/login'
            element={<Login />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
