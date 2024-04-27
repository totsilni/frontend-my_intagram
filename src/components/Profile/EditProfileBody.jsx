import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Avatar, Center, ModalFooter} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import useAuthStore from '../../store/authStore'
import usePreviewImg from '../../hooks/usePreviewImg'
import useEditProfile from '../../hooks/useEditProfile'
import useShowToast from '../../hooks/useShowToast'


const EditProfileBody = ({ onclose }) => {
    const {editprofile, isuploading} = useEditProfile();
    const showtoast = useShowToast();
    const authUser = useAuthStore((state) => state.user)

    const [inputs, setinputs] = useState({
        fullName: authUser.fullName || "",
        username:authUser.username || "",
        bio:authUser.bio || "",
    })

    const handleinputs = (e)=>{
        setinputs({...inputs , [e.target.name]:e.target.value})
    }
    
    const handleEditProfile = async()=>{
        try {
            await editprofile(inputs, SelectedFile);
            setSelectedFile(null);
            onclose();
        } catch (error) {
            showtoast("Error: " ,  error.message, "error");
        }
    }

    const fileRef = useRef(null)
    
    const {SelectedFile, setSelectedFile, handleImageChange} = usePreviewImg()

    return (
        <Flex alignItems={'center'} justifyContent={'center'} bg={"black"} w={"full"} maxW={"md"} p={1} my={0}>
            <Stack spacing={4} w={'full'} maxW={'md'} bg={"black"} rounded={'xl'} boxShadow={'lg'} p={6} my={2}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    Edit Profile
                </Heading>
                <FormControl id="userName" >
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src={SelectedFile || authUser.profilePicURL}>
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <Button onClick={() => {fileRef.current.click()}} w="full">Edit Profile Picture</Button>
                        </Center>
                        <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
                    </Stack>
                </FormControl>
                <FormControl id="fullName" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input placeholder="Full name" _placeholder={{ color: 'gray.500' }}  type="text" name='fullName' value={inputs.fullName} onChange={handleinputs}/>
                </FormControl>
                <FormControl id="userName" isRequired>
                    <FormLabel>User name</FormLabel>
                    <Input placeholder="UserName" _placeholder={{ color: 'gray.500' }} value={ inputs.username} type="text"  name='username' onChange={handleinputs}/>
                </FormControl>
                <FormControl id="bio" isRequired>
                    <FormLabel>Bio</FormLabel>
                    <Input placeholder="Bio" _placeholder={{ color: 'gray.500' }} value={ inputs.bio} type="text" maxLength={120} name='bio' onChange={handleinputs}/>
                </FormControl>
                <ModalFooter mt={1} w={"full"}>
                    <Stack spacing={6} direction={['column', 'row']} w={"full"}>
                        <Button bg={'red.400'} color={'white'} w="full" _hover={{ bg: 'red.500', }} onClick={onclose}>
                            Cancel
                        </Button>
                        <Button isLoading={isuploading} bg={'blue.400'} color={'white'} w="full" _hover={{ bg: 'blue.500', }} onClick={handleEditProfile}>
                            Submit
                        </Button>
                    </Stack>
                </ModalFooter>
            </Stack>
        </Flex>
    )
}

export default EditProfileBody
