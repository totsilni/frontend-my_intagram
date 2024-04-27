import { Container, Flex } from "@chakra-ui/react"
import ProfileTabs from "../../components/Profile/ProfileTabs"
import ProfilePosts from "../../components/Profile/ProfilePosts"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername"
import { useParams } from "react-router-dom"
import UserNotFound from "../../components/UserNotFound/UserNotFound"
import ProfileHeaderSkeleton from "../../components/ProfileHeaderSkeleton/ProfileHeaderSkeleton"


const ProfilePage = () => {

  const {username} = useParams()
  const {isloading, userProfile} = useGetUserProfileByUsername(username);
  const userNotFound = !isloading && !userProfile;
  if(userNotFound) return <UserNotFound />
  return (
    <Container maxW={"container.lg"} py={5} >
            <Flex py={10} px={4} pl={{base:4, md:10}} w={"full"} mx={"auto"} flexDirection={"column"}>
                {!isloading && userProfile && <ProfileHeader /> }
                {isloading && <ProfileHeaderSkeleton />}
            </Flex>
            <Flex px={{base:2, sm:4}} maxW={"full"} mx={"auto"} borderTop={"1px solid"}  borderColor={"whiteAlpha.300"} direction={"column"}>
                <ProfileTabs />
                <ProfilePosts />
            </Flex>
    </Container>
  )
}

export default ProfilePage
