import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQuery } from '@apollo/client';
import { QUERY_ONE_USER } from '../utils/queries';
import Auth from '../utils/auth';
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
        setSocket(io('http://localhost:4000', {
            auth: {
                token: Auth.getToken(),
                username: Auth.getUser().data.username
            }
        }));
        
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('from-server', (data) => {
            // sets the messages recieved with true value
            setChat((prev) => [...prev, { message: data.data.message, username: data.username, recieved: true }])
        })
    }, [socket]);
    const userId = Auth.getUser().data._id;
    const { loading, data } = useQuery(QUERY_ONE_USER, {
        variables: { userId: userId }
    });

    const user = data?.user || {};

    function handleChatForm(e) {
        e.preventDefault();
        let userId = socket.id
        let username = Auth.getUser().data.username
        socket.emit('send-msg', { message, userId, username })
        //sets the messages sent with false value for recieved
        setChat((prev) => [...prev, { message, username, userId, recieved: false }])
        setMessage('');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="App">
                <Heading>
                    <Container bg='blue.200' padding={'4'}>
                        Welcome to instant messaging {user.username}!
                    </Container>
                </Heading>
                <VStack padding={'4'}>
                </VStack>
                <Center>
                    <div className='messenger'>
                        {
                            chat.map((data) => (
                                <p key={data.userId} style={{ textAlign: data.recieved ? 'left' : "right" }}>{data.username}: {data.message}</p>
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