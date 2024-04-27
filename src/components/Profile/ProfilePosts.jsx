import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react"
import ProfilePost from "./ProfilePost"
import useGetUsersPost from "../../hooks/useGetUsersPost"
import NoPostFound from "../UserNotFound/NoPostFound";
const ProfilePosts = () => {

  const { posts, isloading } = useGetUsersPost();
  console.log("Post", posts)
  const noPostsFound = !isloading && posts.length === 0;
  
  if (noPostsFound) {
    return (<NoPostFound />);
  }
  

  return (
    <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={1} columnGap={1}>
      {isloading && [0, 1, 2].map((items, index) => {
        return (<VStack key={index} alignItems={"flex-start"} gap={4}>
          <Skeleton w={"full"}>
            <Box h={"300px"}>
              Constents wrapped {items}
            </Box>
          </Skeleton>
        </VStack>)
      })}
      {!isloading && (<>
        {posts.map((post) => {
          return (<>
            <ProfilePost post={post} img={post.imgURL} key={post.id} video={post.videoURL} />
          </>)
        })}
      </>)}
    </Grid>
  )
}

export default ProfilePosts
