import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Chat from './pages/Chat'
import Home from './pages/Home';

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
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
