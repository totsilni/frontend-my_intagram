import { Avatar,  Button, Flex,  Text, createCookieStorageManager } from "@chakra-ui/react"
import useLogOut from "../../hooks/useLogOut"
import useAuthStore from "../../store/authStore"
import { Link } from "react-router-dom"
import { useEffect } from "react"

const SuggestedHeader = () => {
    const {islogingOut, handlelogout, } = useLogOut()
    const authUser = useAuthStore((state) => {return state.user});
    if(!authUser){
        return null;
    }
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} >
            <Flex alignItems={"center"} gap={2}>
            <Link to={`${authUser.username}`}>
                <Avatar  size={"lg"} src={authUser.profilePicURL}></Avatar>
            </Link>
            <Link to={`${authUser.username}`}>
                <Text fontSize={12} fontWeight={"bold"}>
                    {authUser.username}
                </Text>
            </Link>
            </Flex>
            <Button onClick={handlelogout} size={"xs"} fontSize={14} textDecoration={"none"} background={"transparent"}  fontWeight={"medium"} transition={"ease-out"} isLoading={islogingOut}  _hover={{background:"transparent"}}  color={"blue.400"} cursor={"pointer"}>Log out</Button>
        </Flex>
    )
}

export default SuggestedHeader
