import React from 'react'
import '../App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
    Container,
    Heading,
    VStack,
    Center
} from '@chakra-ui/react';

function Chat() {
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
            // sets the messages recieved with true value
            setChat((prev) => [...prev, {message: data.message, recieved: true}])
        })
    }, [socket])

    function handleChatForm(e) {
        e.preventDefault();
        console.log(message);
        socket.emit('send-msg', { message })
        //sets the messages sent with false value for recieved
        setChat((prev) => [...prev, {message, recieved: false}])
        setMessage('');
    }
    return (
        <>
            <div className="App">
                <Heading>
                    <Container bg='blue.200' padding={'4'}>
                        Welcome to instant messaging!
                    </Container>
                </Heading>
                <VStack padding={'4'}>
                </VStack>
                <Center>
                    <div className='messenger'>
                        {
                            chat.map((data) => (
                                <p key={data.message} style={{textAlign: data.recieved ? 'left' : "right"}}>Message: {data.message}</p>
                            ))
                        }
                        <form onSubmit={handleChatForm} className='chat-form'>
                            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type something" className='chat-input'></input>
                            <button type='submit' className='chat-btn'>Send</button>
                        </form>
                    </div>
                </Center>
            </div>
        </>
    )
}

export default Chat;