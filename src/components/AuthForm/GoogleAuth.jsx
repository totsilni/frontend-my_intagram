import { Flex, Image, Text } from "@chakra-ui/react"
import useSignInwithGoogle from "../../hooks/useSignInwithGoogle"


const GoogleAuth = ({prefixes}) => {
  const  {handleGoogleAuth, error , loading} = useSignInwithGoogle()
  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
        <Image src='/google.png' w={5} alt='Google Logo' />
        <Text mx={2} color={"blue.500"}>{prefixes} with Google</Text>
    </Flex>
  )
}

export default GoogleAuth
