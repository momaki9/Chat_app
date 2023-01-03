import {
    Stack,
    Center,
    Heading,
    Button
} from "@chakra-ui/react";
import Auth from '../utils/auth';
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <>
            <Stack direction={'row'} padding='5' bg={'blackAlpha.200'} spacing='10'>
                <Center>
                    <Link to='/'>
                        <Heading>Home</Heading>
                    </Link>
                </Center>
                {Auth.loggedIn() ? (
                    <>
                        <Center>
                            <Link to='/chat'>
                                <Heading>Chat</Heading>
                            </Link>
                        </Center>
                        <Center>
                            <Link to='/profile'>
                                <Heading>Profile</Heading>
                            </Link>
                        </Center>
                        <Center>
                            <Button onClick={logout} bg='red.400' color={'white'} _hover={{bg:'red.300'}}>Logout</Button>
                        </Center>
                    </>
                ) : (
                    <Center>
                        <Login />
                        <Signup />
                    </Center>
                )}
            </Stack>
        </>
    )
};

export default Navbar;