import { Avatar, Button, Divider, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import Comment from '../Comment/Comment';
// import Caption from '../Caption/Caption';
import PostFooter from './PostFooter';
import useDeletedPost from '../../hooks/useDeletedPost';
import useAuthStore from '../../store/authStore';
// import userProfileStore from '../../store/userProfileStore';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import CaptionModalforFeedBack from '../Caption/CaptionModalforFeedBack';

const FeedBackModelSection = ({ img, video, post, }) => {
    const { handleDeletePost, isDeleting } = useDeletedPost(post, img, video)
    const authuser = useAuthStore(state => state.user);
    console.log(post.id);
    const { userProfile, isloading } = useGetUserProfileById(post.createdBy)
    // const userProfile = userProfileStore(state => state.userProfile);
    // if (isloading) {
    //     return null;
    // }



    return (
        <>
            {!isloading && (
                <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
                    <Flex justifyContent={"center"} alignItems={"center"} borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} flex={1.5}>
                        {img && (<Image objectFit={"cover"} w={"full"} h={"100%"} src={img} alt={"Image Post"} />)}
                        {video && (<video controls autoPlay loop style={{ objectFit: "cover", width: "fill", height: "100%" }} src={video} alt={"Video post"} />)}
                    </Flex>
                    <Flex flex={1} flexDirection={"column"} px={10} display={{ base: "none", md: "flex" }}>
                        <Flex alignItems={"center"} justifyContent={"space-between"}>
                            <Flex alignItems={"center"} gap={4}>
                                <Avatar src={userProfile.profilePicURL} size={"sm"} name={userProfile.username} />
                                {/* <Avatar src="/profilepic.png" size={"sm"} name='As a Programmer' /> */}
                                <Text fontSize={12} fontWeight={"bold"}>{userProfile.username}</Text>
                            </Flex>
                            {/* Button here */}
                            {authuser?.uid === userProfile.uid && (
                                <Button onClick={handleDeletePost} isLoading={isDeleting} size={"sm"} bg={"transparent"} _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1}>
                                    <MdDelete size={20} cursor={"pointer"} />
                                </Button>
                            )}
                        </Flex>
                        <Divider my={4} bg={"gray.500"} />
                        <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                            {/* Captions */}
                            {post.caption && <CaptionModalforFeedBack userProfile={userProfile}  post={post} />}
                            {post.comments.map((comment) => {
                                return (<Comment key={comment.id} comment={comment} />)
                            })}
                        </VStack>
                        <Divider my={4} bg={"gray.800"} />
                        <PostFooter isProfilePage={true} post={post} />
                    </Flex>

                </Flex>
            )}
        </>
    )

}
export default FeedBackModelSection
