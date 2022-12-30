import React from 'react';
import { Link } from 'react-router-dom';
import {
    Heading,
    Center
} from '@chakra-ui/react'

const Home = () => {
    return (
        <>
            <Center>
                <Link to='/'>
                    <Heading>Home</Heading>
                </Link>
            </Center>
            <Center>
                <Link to='/chat'>
                    <Heading>Login</Heading>
                </Link>
            </Center>
        </>
    )
};

export default Home;