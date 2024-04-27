import {  Modal, ModalBody, ModalCloseButton, ModalContent,  ModalOverlay } from "@chakra-ui/react"
import EditProfileBody from "./EditProfileBody"

const EditProfile = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                    <ModalCloseButton />
                    <ModalBody >
                        <EditProfileBody onclose={onClose}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditProfile
