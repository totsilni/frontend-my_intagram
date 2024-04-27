import { Box, Link, Tooltip, useDisclosure } from "@chakra-ui/react"
import { SearchLogo } from "../../assets/contants"
import SearchBarModel from "./SearchBarModel"

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (isOpen) {
        return (<>
            <SearchBarModel isOpen={isOpen} onClose={onClose} />
        </>)
    }
    
    return (
        <Tooltip hasArrow label={"Search"} placement='right' ml={1} openDelay={790} display={{ base: "block", md: "none" }}>
            <Link onClick={onOpen} display={"flex"} alignItems={"center"} gap={4} _hover={{ bg: "whiteAlpha.500" }} borderRadius={6} p={2} w={{ base: 10, md: "full" }} justifyContent={{ base: "center", md: "flex-start" }} >
                <SearchLogo />
                <Box display={{ base: "none", md: "block" }}>
                    Search
                </Box>
            </Link>
        </Tooltip>
    )
}

export default Search
