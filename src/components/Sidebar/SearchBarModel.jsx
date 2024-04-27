import { Modal, ModalBody, ModalCloseButton, ModalContent,  ModalOverlay } from "@chakra-ui/react"
import SearchBar from "./SearchBar"


const SearchBarModel = ({isOpen, onClose}) => {

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft" isCentered={false}>
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalCloseButton onClick={onClose}/>
          <ModalBody pb={6}>
            <SearchBar />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchBarModel
