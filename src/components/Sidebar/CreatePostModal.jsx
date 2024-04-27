import {  Modal, ModalBody, ModalCloseButton, ModalContent,  ModalHeader, ModalOverlay } from '@chakra-ui/react'
import CreatePostBody from './CreatePostBody'
const CreatePostModal = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreatePostBody onclose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default CreatePostModal
