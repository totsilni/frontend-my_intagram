import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react"
import FeedBackModelSection from "./FeedBackModelSection"

const FeedBackModel = ({isOpen, onClose, img , video, post, userProfile}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody bg={"black"} pb={5} >
        <FeedBackModelSection img={img} video={video} post={post} userProfile={userProfile}/>
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default FeedBackModel
