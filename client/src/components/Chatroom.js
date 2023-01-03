import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Stack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Chatroom = ({title, key, roomId}) => {
    return (
        <>
            <Card key={key}>
                <CardHeader>{title}</CardHeader>
                <CardBody>
                    <Stack>
                        <Box>
                            <Button><Link to={`/chat/${roomId}`}>Join</Link></Button>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}
export default Chatroom;