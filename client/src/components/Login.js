import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
    FormControl,
    FormLabel,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    Input,
    Modal,
    Button,
    useDisclosure,
    ModalOverlay,
    ModalFooter
} from "@chakra-ui/react";

function Login() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState }
            });
            Auth.login(data.login.token)

        } catch (err) {
            console.error(err)
        }
        setFormState({
            username: '',
            password: ''
        })
    }

    return (
        <>
            <Button onClick={onOpen}  size={'lg'} padding='5' margin={'1'} colorScheme='blue' mr={3}>Login</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleLogin}>
                    <ModalContent>
                        <ModalHeader>Login</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder='Username'
                                    name="username"
                                    type={"text"}
                                    value={formState.username}
                                    onChange={handleFormChange}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder='Password'
                                    name="password"
                                    type={"password"}
                                    value={formState.password}
                                    onChange={handleFormChange}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit'>
                                Login
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
};

export default Login;