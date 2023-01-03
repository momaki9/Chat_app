import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';
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

function Signup() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [addUser, { error, data }] = useMutation(ADD_USER);

    const formChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmission = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Button onClick={onOpen} size={'lg'} padding='5' margin={'1'} colorScheme='blue' mr={3}>Signup</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleFormSubmission}>
                    <ModalContent>
                        <ModalHeader>Create Your Account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder='Username'
                                    name="username"
                                    type={'text'}
                                    value={formState.username}
                                    onChange={formChange}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder='Email'
                                    name="email"
                                    type={'text'}
                                    value={formState.email}
                                    onChange={formChange}
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder='Password'
                                    name="password"
                                    type={'password'}
                                    value={formState.password}
                                    onChange={formChange}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit'>
                                Create
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
};

export default Signup;