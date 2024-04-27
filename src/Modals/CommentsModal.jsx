import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import Comment from "../components/Comment/Comment"
import useCommentsPost from "../hooks/useCommentsPost"
import { useEffect, useRef } from "react";

const CommentsModal = ({isOpen, onClose, post}) => {

    const {handlePostComment, iscommenting} = useCommentsPost();

    const commentRef = useRef("");
    const commentsContainerRef = useRef(null);

        const handleSubmitComment = async(e)=>{
            e.preventDefault();
            await handlePostComment(post.id, commentRef.current.value)
            commentRef.current.value = "";
        }

        useEffect(() => {
            const scrollToButtom = ()=>{
                commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
            }
            if(isOpen){
                setTimeout(()=>{
                    scrollToButtom();
                }, 1000)
            }
        }, [post.comments.length, isOpen])
        

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
                <Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentsContainerRef} >
                {post.comments.map((comment, index)=>{
                    return (
                        <Comment key={index} comment={comment} />
                    )
                })}
                </Flex>
                    <form onSubmit={handleSubmitComment} style={{marginTop:"2rem"}}>
                        <Input placeholder="Comment" type="text" ref={commentRef}  size={"sm"}/>
                        <Flex w={"full"} justifyContent={"flex-end"} > 
                            <Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={iscommenting}>
                                Post
                            </Button>
                        </Flex>
                    </form>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default CommentsModal
