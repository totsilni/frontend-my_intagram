import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPost from '../../hooks/useGetFeedPost'

const FeedPosts = () => {

  const { isloading, posts } = useGetFeedPost();
  return (
    <Container display={"flex"} flexDirection={"column"} maxW={"container.sm"} py={10} alignItems={"center"} px={2}>
      {isloading && [0, 1, 2, 3].map((count, index) => {
        return (<VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
          <Flex gap={2}>
            <SkeletonCircle size='10' />
            <VStack gap={2} alignItems={"flex-start"}>
              <Skeleton height='10px' w={200} />
              <Skeleton height='10px' w={200} />
            </VStack>
          </Flex>
          <Skeleton w={"full"}>
            <Box h={"450px"}>contents wrapped</Box>
          </Skeleton>
        </VStack>)
      })}
      {!isloading && posts.length > 0 && posts.map((post) => {
        return (<>
          <FeedPost key={post.id} video={post.videoURL} img={post.imgURL} post={post} />
        </>)
      })}

      {!isloading && posts.length ===0 && (<>
        <Text fontSize={"md"} color={"red.400"}>
          No Post Found Because You cannot follow anyone!
        </Text>
        <Text color={"red.600"} textAlign={"center"} fontWeight={"bolder"}>
          First Make Some Friends👀👀!
        </Text>
      </>)}
    </Container>
  )
}

export default FeedPosts
