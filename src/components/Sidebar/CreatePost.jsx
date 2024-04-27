import { Box, Link, Tooltip, useDisclosure } from "@chakra-ui/react"
import { CreatePostLogo } from "../../assets/contants"
import CreatePostModal from "./CreatePostModal"

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    <Tooltip hasArrow label={"Create"} placement='right' ml={1} openDelay={790} display={{ base: "block", md: "none" }}>
      <Link display={"flex"} onClick={onOpen} alignItems={"center"} gap={4} _hover={{ bg: "whiteAlpha.500" }} borderRadius={6} p={2} w={{ base: 10, md: "full" }} justifyContent={{ base: "center", md: "flex-start" }} >
        <CreatePostLogo />
        <Box display={{ base: "none", md: "block" }}>
          Create
        </Box>
      </Link>
    </Tooltip>
    {isOpen && <><CreatePostModal isOpen={isOpen} onClose={onClose} /></>}
    </>
  )
}

export default CreatePost
