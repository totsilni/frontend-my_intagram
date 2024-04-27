import { Box, Flex, Input, InputGroup, InputRightElement, Text, Button, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/contants'
import useCommentsPost from '../../hooks/useCommentsPost'
import useAuthStore from '../../store/authStore'
import useLikePost from '../../hooks/useLikePost'
import timeAgo from '../../utils/timeAgo'
import CommentsModal from '../../Modals/CommentsModal'

const PostFooter = ({ isProfilePage, post , creatorProfile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handlePostComment, iscommenting } = useCommentsPost();
    const [comment, setcomment] = useState('')
    const commentRef = useRef(null)
    const {handleLikePost, likes, IsLiked } = useLikePost(post);
    const {gettime} = timeAgo()
    const authuser = useAuthStore(state => state.user);

    const handleSubmitComment = async () => {
        try {
            await handlePostComment(post.id, comment)
            setcomment('')

        } catch (error) {
            console.error(error)
        }
    }

    

    return (
        <Box mb={10} mt={"auto"} w={"full"}>
            <Flex alignItems={"center"} gap={4} width={"full"} pt={0} mb={2} mt={4}>
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
                    {!IsLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
                    {/* {!IsLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)} */}
                </Box>
                <Box cursor={"pointer"} onClick={()=> {commentRef.current.focus()}} fontSize={18}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} Likes
            </Text>
            {isProfilePage && (
                <Text fontSize={12} color={"gray"}>
                    Post {gettime(post.createdAt)}
                </Text>
            )}
            {!isProfilePage && (<>
                <Text fontSize={"sm"}  fontWeight={700}>
                    {creatorProfile?.username}{" "}
                    <Text as={"span"} fontWeight={400} >
                        {post.caption}
                    </Text>
                </Text>
              {post.comments.length > 0 && (
                <Text onClick={onOpen}  fontSize={'sm'} color={'gray'}  cursor={"pointer"}>
                    View all {post.comments.length} comments
                </Text>
              )}
            </>)}

            {authuser && (
                <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
                    <InputGroup>
                        <Input variant={"flushed"} value={comment} ref={commentRef} onChange={(e) => { setcomment(e.target.value) }} placeholder={'Add a comment...'} fontSize={14} />
                        <InputRightElement>
                            <Button fontSize={14} color={"blue.500"} onClick={handleSubmitComment} isLoading={iscommenting} fontWeight={600} cursor={"pointer"} _hover={{ color: "white" }} bg={"transparent"}>Post</Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            )}
            {isOpen ? (
                <CommentsModal post={post} isOpen={isOpen} onClose={onClose}/>
            ) : null}

        </Box>
    )
}

export default PostFooter
