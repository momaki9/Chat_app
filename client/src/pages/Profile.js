import React, { useState } from "react";
import {
    Button,
    Card,
    CardBody,
    Modal,
    ModalContent,
    ModalOverlay,
    FormControl,
    useDisclosure,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormLabel,
    Input,
    ModalFooter
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { useMutation } from "@apollo/client";
import { CREATE_ROOM } from "../utils/mutations";
import Auth from '../utils/auth';

const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const userId = Auth.getUser().data._id;

    const [roomCategory, setRoomCategory] = useState({ category: '' });
    const [createRoom, { error }] = useMutation(CREATE_ROOM);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomCategory({ category: value })
    }

    async function createChatRoom(event) {
        event.preventDefault();
        try {
            const { data } = await createRoom({
                variables: {
                    category: roomCategory.category,
                    userId: userId
                }
            })
        } catch (error) {
            console.error(error)
        }
        setRoomCategory({ category: '' })
    }
    return (
        <>
            <Navbar />
            <h1>Profile Page</h1>
            <Card>
                <CardBody>
                    <Button onClick={onOpen}>Create Chatroom</Button>
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <form onSubmit={createChatRoom}>
                            <ModalContent>
                                <ModalHeader>Create A Chatroom</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Chatroom Name:</FormLabel>
                                        <Input
                                            ref={initialRef}
                                            placeholder='i.e. mychatroom'
                                            name="category"
                                            type={'text'}
                                            value={roomCategory.category}
                                            onChange={handleChange}
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
                </CardBody>
            </Card>
        </>
    )
};

export default Profile;