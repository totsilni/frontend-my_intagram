import {  Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { useDisclosure } from "@chakra-ui/react"
import ProfileModelSection from "./ProfileModelSection"
import { useRef } from "react"
const ProfilePost = ({ img, video, post }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const videoRef = useRef()

    if(isOpen){
      try {
        videoRef.current.pause();
      } catch (error) {
        console.log(error);
      }
    }else{
      try {
        videoRef.current.play();
      } catch (error) {
        console.log(error);
      }
    }

  return (<>
    <GridItem cursor={"pointer"} borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} position={"relative"} aspectRatio={1 / 1} onClick={onOpen}   >

      <Flex opacity={0} _hover={{ opacity: 1 }} position={"absolute"} top={0} left={0} right={0} bottom={0} bg={"blackAlpha.700"} transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"} >
        <Flex alignItems={"center"} justifyContent={"center"} gap={30}>
          <Flex>
            <AiFillHeart size={20} />
            <Text fontWeight={"bold"} ml={2}>{post.likes.length}</Text>
          </Flex>
          <Flex>
            <FaComment size={20} />
            <Text fontWeight={"bold"} ml={2}>{post.comments.length}</Text>
          </Flex>
        </Flex>
      </Flex>

      {img  && (
        <Image src={img} alt={""} w={"100%"} h={"100%"} objectFit={"cover"} />
      )}
    
      {video && (
        <video ref={videoRef}  style={{objectFit:"cover", height:"100%", width:"100%"}} alt={"hh"}  autoPlay loop  muted>
          <source src={video} />
        </video>
      )}
      {/* {video && (
        <video src={video} style={{objectFit:"cover", height:"100%", width:"100%"}} alt={"hh"}  autoPlay loop  muted    ref={videoRef} />
      )} */}

    </GridItem>

    {/** isCentered is used to centered the model to the screen  */}
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bg={"black"} pb={5} >
          <ProfileModelSection img={img} video={video} post={post}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
}

export default ProfilePost
