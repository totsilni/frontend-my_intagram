import {  Flex, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { useDisclosure } from "@chakra-ui/react"
import ProfileModelSection from "./ProfileModelSection"
const ProfilePost = ({ post, img }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
    console.log("defe",post.filesURL)

  return (<>
    <GridItem cursor={"pointer"} borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} position={"relative"} aspectRatio={1 / 1} onClick={onOpen}>

      <Flex opacity={0} _hover={{ opacity: 1 }} position={"absolute"} top={0} left={0} right={0} bottom={0} bg={"blackAlpha.700"} transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"} >
        <Flex alignItems={"center"} justifyContent={"center"} gap={30}>
          <Flex>
            <AiFillHeart size={20} />
            <Text fontWeight={"bold"} ml={2}>192</Text>
          </Flex>
          <Flex>
            <FaComment size={20} />
            <Text fontWeight={"bold"} ml={2}>32</Text>
          </Flex>
        </Flex>
      </Flex>

      <video src={post.filesURL} style={{objectFit:"cover", height:"100%", width:"100%"}} />
    </GridItem>

    {/** isCentered is used to centered the model to the screen  */}
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bg={"black"} pb={5} >
          <ProfileModelSection img={img} />
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
  )
}

export default ProfilePost
