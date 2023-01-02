import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Stack
} from '@chakra-ui/react';

const Chatroom = ({title, goSomeWhere, key}) => {
    return (
        <>
            <Card key={key}>
                <CardHeader>{title}</CardHeader>
                <CardBody>
                    <Stack>
                        <Box>
                            <Button onClick={goSomeWhere}>Join</Button>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}
export default Chatroom;