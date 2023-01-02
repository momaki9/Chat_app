import React from 'react';
import { Link } from 'react-router-dom';
import {
    Heading,
    Center,
    Button
} from '@chakra-ui/react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Auth from '../utils/auth';

const Home = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <>
            <Center>
                <Link to='/'>
                    <Heading>Home</Heading>
                </Link>
            </Center>
            {Auth.loggedIn() ? (
                <Center>
                    <Button onClick={logout}>Logout</Button>
                </Center>
            ) : (
                <Center>
                    <Link to='/chat'>
                        <Heading>Login</Heading>
                    </Link>
                </Center>
            )}
            <Center>
                <Heading bg={'gray.300'}>Welcome!</Heading>
            </Center>
            <Center>
                <Heading bg='skyblue'>Login or singup to start chatting!</Heading>
            </Center>
            <Center padding={'10'}><Login /></Center>
            <Center><Signup /></Center>
        </>
    )
};

export default Home;