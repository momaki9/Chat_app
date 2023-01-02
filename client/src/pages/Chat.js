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
                token: Auth.getToken()
            }
        }));
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('from-server', (data) => {
            // console.log('Message recieved from server!!', data)
            // sets the messages recieved with true value
            setChat((prev) => [...prev, { message: data.message, recieved: true }])
            console.log(data)
        })
    }, [socket]);

    // console.log(Auth.getToken())
    // console.log(Auth.getUser())
    // console.log(Auth.getUser().data._id)

    const userId = Auth.getUser().data._id;
    const { loading, data } = useQuery(QUERY_ONE_USER, {
        variables: { userId: userId }
    });

    const user = data?.user || {};

    function handleChatForm(e) {
        e.preventDefault();
        socket.emit('send-msg', { message })
        //sets the messages sent with false value for recieved
        setChat((prev) => [...prev, { message, recieved: false }])
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
                        Welcome to instant messaging!
                    </Container>
                </Heading>
                <VStack padding={'4'}>
                </VStack>
                <Center>
                    <div className='messenger'>
                        {
                            chat.map((data) => (
                                <p key={data.message} style={{ textAlign: data.recieved ? 'left' : "right" }}>{user.username}: {data.message}</p>
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