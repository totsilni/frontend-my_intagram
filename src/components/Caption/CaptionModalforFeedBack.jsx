import { Avatar, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import timeAgo from '../../utils/timeAgo';

const CaptionModalforFeedBack = ({post, userProfile}) => {
    const { gettime } = timeAgo();
    console.log("Caption", userProfile)
  return (
    <Flex gap={4}>
    <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} cursor={"pointer"} alt={"User Profile Pic"} name={userProfile.fullName} size={"sm"} />
    </Link>
    <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
            <Link to={`/${userProfile.username}`}>
                <Text cursor={"pointer"} fontWeight={"bold"} fontSize={12}>
                    {userProfile.username}
                </Text>
            </Link>
            <Text fontWeight={"bold"} fontSize={14}>
                {post.caption}
            </Text>
        </Flex>
        <Text fontWeight={"bold"} color={"gray"} fontSize={12}>
            {gettime(post.createdAt)}
        </Text>
    </Flex>
</Flex>
  )
}

export default CaptionModalforFeedBack
