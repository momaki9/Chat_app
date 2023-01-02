import { Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <>
        <Stack direction={'row'}>
            <Link to={'/'}>Home</Link>
            <Link to={'/chat'}>Chat</Link>
        </Stack>
        </>
    )
};

export default Navbar;