import { Avatar, Box, Button, Flex} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useFollowerUser from '../../hooks/useFollowerUser'
import timeAgo from '../../utils/timeAgo'
const PostHeader = ({post, creatorProfile}) => {
    const {gettime} = timeAgo();
    const {isfollowing, handlefollowUser ,isuploading} = useFollowerUser(post.createdBy)


    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
            <Flex alignItems={"center"} gap={2}>
            <Link to={`/${creatorProfile.username}`}>
                <Avatar src={creatorProfile.profilePicURL} cursor={"pointer"} alt={creatorProfile.username} size={"sm"} />
            </Link>
                <Flex fontSize={13} fontWeight={"bold"} cursor={"pointer"} gap={2}>
            <Link to={`/${creatorProfile.username}`}>
                   {creatorProfile.username}
            </Link>
                    <Box color={"gray.500"} >. {gettime(post.createdAt)}</Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
            <Button onClick={handlefollowUser} isLoading={isuploading} size={"xs"} bg={"transparent"} fontSize={13} color={"blue.500"} fontWeight={"bold"} _hover={{color:"white"}} transition={"0.2s ease-in-out"}>
                {isfollowing? "Unfollow" : "Follow"}
            </Button>
            </Box>
        </Flex>
    )
}

export default PostHeader
