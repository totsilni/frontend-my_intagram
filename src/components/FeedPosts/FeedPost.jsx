import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import FeedBackModel from './FeedBackModel'
import { Box, Flex, Image, Skeleton, SkeletonCircle , useDisclosure} from '@chakra-ui/react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({img, video, post}) => {

  const {userProfile, isloading} = useGetUserProfileById(post.createdBy)
  console.log(userProfile, "post  ",   post);
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    {isloading && (
      <Flex gap={2} alignSelf={"flex-start"} justifyContent={"flex-start"} >
      <SkeletonCircle size={10}/>
      <Flex gap={2} flexDir={"column"}>
      <Skeleton w={"100px"} h={"10px"} />
      <Skeleton w={"100px"} h={"10px"} />
      </Flex>
      </Flex>
    )}
    {!isloading && (<>
     <PostHeader post={post}  creatorProfile={userProfile}/>
    </>)}

        <Box onClick={onOpen}  height={"400px"}  my={2} borderRadius={4} overflow={"hidden"}>
            {img && <Image   src={img} alt={"Image FeetPost"}/>}
            {video && <video autoPlay loop muted controlsList='nodownload nofullscreen' controls src={video} alt={"Video FeetPost"}  style={{objectFit:"contain", width:"full",height:"100%"}}/>}
        </Box>
     {!isloading && (
      <PostFooter post={post} img={img} video={video} creatorProfile={userProfile} username1={userProfile.username}/> 
     )}
     {isOpen && (
      <>
        <FeedBackModel isOpen={isOpen} onClose={onClose} img={img} video={video} post={post} isloading={isloading} userProfile={userProfile}
        />
      </>
     )}
    </>
  )
}

export default FeedPost
