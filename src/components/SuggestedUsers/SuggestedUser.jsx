import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react"
import useFollowerUser from "../../hooks/useFollowerUser"
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
const SuggestedUser = ({ user, setUser }) => {
    const { handlefollowUser, isfollowing, isuploading } = useFollowerUser(user.uid);
    const authUser = useAuthStore((state) => state.user);

    const onFollowUser = async () => {
        await handlefollowUser();
        console.log(authUser);
        setUser({ ...user, followers: isfollowing ? user.followers.filter((follower) => { return follower.uid !== authUser.uid }) : [...user.followers, authUser] })
    }

    return (

        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`/${user.username}`}>
                    <Avatar src={user.profilePicURL} name={user.fullName} size={"md"} />
                </Link>
                <VStack spacing={2} alignItems={"flex-start"}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        <Link to={`/${user.username}`} >
                            {user.fullName}
                        </Link>
                    </Box>
                    <Box fontSize={11} color={"gray.500"}>
                        {user.followers.length} followers
                    </Box>
                </VStack>
            </Flex>

            {authUser.uid !== user.uid && (<>
                <Button fontSize={13} bg={"transparent"} p={0} h={"max-content"} fontWeight={"medium"} color={"blue.400"} cursor={"pointer"} _hover={{ color: "white" }} onClick={onFollowUser} isLoading={isuploading}> {isfollowing ? "Unfollow" : "Follow"} </Button>
            </>)}
        </Flex>
    )
}

export default SuggestedUser
