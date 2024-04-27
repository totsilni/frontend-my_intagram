import { Flex, Link, Text } from '@chakra-ui/react'
import { Link as Rounterlink } from 'react-router-dom'
const UserNotFound = () => {
    return (
        <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
            <Text fontSize={"2xl"}>
                User Not Found
            </Text>
            <Link to={"/"} as={Rounterlink} color={"blue.500"} w={"max-content"} mx={"auto"}>
                Go home
            </Link>
        </Flex>
    )
}

export default UserNotFound
