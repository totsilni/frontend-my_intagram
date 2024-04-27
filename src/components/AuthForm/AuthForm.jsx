import { Box, Flex, Image,  Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from './GoogleAuth'
import FacebookAuth from './FacebookAuth'


const AuthForm = () => {
    const [islogin, setislogin] = useState(true)

    
    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image src='/logo.png' h={24} cursor={"pointer"} alt='Instagram'  />
                    
                    {islogin ? <Login /> : <Signup />}
        
                    {"*******************OR TEXT***************"}
                    <Flex alignItems={"center"} justifyContent={"center"} my={3} gap={1} w={"full"}>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>OR</Text>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                    </Flex>
                    <FacebookAuth prefiex={islogin ? "Log in" : "Sign up"}/>
                    <GoogleAuth prefixes={islogin ? "Log in" : "Sign up"} />
                </VStack>
            </Box>

            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>
                        {islogin ? "Don't have an account?": "Already have an account?"}
                    </Box>
                    <Box onClick={()=>{setislogin(!islogin)}} color={"blue.500"} cursor={"pointer"}>
                        {islogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default AuthForm
