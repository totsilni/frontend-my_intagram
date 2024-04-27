import {  Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
// import { BiLogOut } from "react-icons/bi";

import {  InstagramLogo, InstagramMobileLogo,} from '../../assets/contants'
import useLogOut from '../../hooks/useLogOut';
import Sidebaritems from './Sidebaritems';
const Sidebar = () => {
    const {handlelogout, islogingOut} = useLogOut()
    
    return (
        <Box height={"100vh"} borderRight={"1px solid"} borderColor={"whiteAlpha.300"} py={8} position={"sticky"} top={0} left={0} px={{ base: 2, md: "4" }}>

            <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
                <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor="pointer">
                    <InstagramLogo />
                </Link>
                <Link to={"/"} as={RouterLink} p={2} display={{ base: "block", md: "none" }} cursor="pointer" borderRadius={6} _hover={{ bg: "whiteAlpha.200" }} w={10}>
                    <InstagramMobileLogo />
                </Link>
                <Flex direction={"column"} gap={5} cursor={"pointer"} >
                    <Sidebaritems />
                </Flex>
                    {/* LOGOUT */}
                <Tooltip  hasArrow label={"Logout"} placement='right' ml={1} openDelay={790} display={{ base: "block", md: "none" }}>
                    <Flex mt={"auto"} onClick={handlelogout}  alignItems={"center"} gap={4} _hover={{ bg: "whiteAlpha.500" }} borderRadius={6} p={2} w={{ base: 10, md: "full" }}  justifyContent={{ base: "center", md: "flex-start" }} >
                    <svg stroke="currentColor" fill={"currentColor"} strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg>
                        <Button variant={"ghost"} _hover={{bg:"transparent"}} isLoading={islogingOut} display={{ base: "none", md: "block" }}>
                            Logout
                        </Button>
                    </Flex>
                </Tooltip>
            </Flex>
        </Box>
    )
}

export default Sidebar
