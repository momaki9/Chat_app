import React from 'react';
import {
    Heading,
    Center,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Card,
    CardBody,
    Text,
    CardHeader,
    CardFooter
} from '@chakra-ui/react';

const Home = () => {
    return (
        <>
            <Center>
                <Heading padding={'5'}>Welcome to Instant Chat App!</Heading>
            </Center>
            <Center>
                <Card padding={'8'} margin='5' bg={'facebook.200'} width='50%'>
                    <CardHeader>
                        <Heading>
                            We are happy to see you using our app!
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Center>
                        <Text fontSize={'2xl'}>This app was built using React and Socket.io to give you the smoothing instant chatting experience</Text>
                        </Center>
                    </CardBody>
                    <CardFooter fontSize={'small'}>If you like our app, consider leaving us a review!</CardFooter>
                </Card>
            </Center>
            <Center>
                <Heading padding={'5'} size='md'>Benefits of using our Instant Chat App</Heading>
            </Center>
            <Center>
                <Tabs variant='soft-rounded' colorScheme='facebook'>
                    <TabList>
                        <Tab>Connect with your friends!</Tab>
                        <Tab>Make new friends!</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>Easily connect with your friends worldwide.</p>
                            <p>Visit your profile page and see with friends are online and available to chat!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>Visit the Explore page to view and find new friends that have the same interests as you!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Center>

        </>
    )
};

export default Home;