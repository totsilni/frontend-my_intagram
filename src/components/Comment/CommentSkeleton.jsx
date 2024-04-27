import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react"

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}> 
        <SkeletonCircle />
        <Flex gap={1} flexDirection={"column"} >
            <Skeleton h={2} w={"100%"}/>
            <Skeleton h={2} w={"50%"}/>
        </Flex>
    </Flex>
  )
}

export default CommentSkeleton
