import {  Box, Flex, Link, Text, VStack } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import { Link as RounterLink } from "react-router-dom"
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser"

const SuggestedUsers = () => {
    const {SuggestedUsers, isloading} = useGetSuggestedUser();

    if(isloading){
        return null;
    }

  return (
    <VStack py={8} px={6} gap={4}>
    <SuggestedHeader/>

    {SuggestedUsers.length >0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={14} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
        </Text>
        <Text fontSize={12} fontWeight={"bold"}   _hover={{color:"gray.400"}}  cursor={"pointer"}>
            See All
        </Text>
    </Flex>
    
    )}

    {SuggestedUsers.map((suggesteduser, index)=>{
        return (
            <SuggestedUser user={suggesteduser} key={index} />
        )
    })}

    <Box fontSize={12} color={"gray.500"} alignSelf={"start"} mt={5}>
        &copy; 2024 Built by{" "}
        <Link as={RounterLink} to={"my Yoytube account"} target="_blank" color={"blue.500"} fontSize={14}>
            As a Programmer
        </Link>
    </Box>

    </VStack>
  )
}

export default SuggestedUsers
