import React from "react";
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
    return (
        <>
            <Button onClick={onOpen}>Signup</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Your Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input ref={initialRef} placeholder='Username' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default Signup;