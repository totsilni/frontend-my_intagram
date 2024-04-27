import { Button, CloseButton, Flex, Image, Input, Textarea } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { BsFillImageFill } from "react-icons/bs"
// import useUploadPost from "../../hooks/useUploadPost"
import useShowToast from "../../hooks/useShowToast"
import usePostVideoOrImg from "../../hooks/usePostVideoOrImg"
import useUploadbothVideoandImg from "../../hooks/useUploadbothVideoandImg"


const CreatePostBody = ({onclose}) => {
  const actionRef = useRef(null);
  const [caption, setcaption] = useState();
  const showtoast = useShowToast();
  const { SelectedVideo,SelectedImg, setSelectedImg, SelectedImgAndVideo, setSelectedImgAndVideo,handlePostMedia, setSelectedVideo, setimgtype, setvideotype } = useUploadbothVideoandImg()
  const {handleCreatePost, isloading} =  usePostVideoOrImg()
  // const {handleCreatePost, isloading} =  useUploadPost(SelectedVideo, caption)
  console.log(SelectedImgAndVideo)
  const handleCreatePosts =async()=>{

    try {
      await  handleCreatePost(SelectedVideo, caption ,  SelectedImg , SelectedImgAndVideo);
      onclose();
      setSelectedVideo(null);
      setSelectedImg(null);
    } catch (error) {
      showtoast("Error", error.message, "error");
    }
  }
  // const handleCreatePosts =async()=>{

  //   try {
  //     await  handleCreatePost(SelectedVideo, caption );
  //     onclose();
  //     setSelectedVideo(null);
  //     console.log("sjbbj")
  //   } catch (error) {
  //     showtoast("Error", error.message, "error");
  //   }
  // }
  return (<>

    <Textarea placeholder="Post Caption..." style={{ resize: "none" }} value={caption} onChange={(e) => { setcaption(e.target.value) }} />
    <Input type="file" hidden ref={actionRef} onChange={handlePostMedia} />
    <BsFillImageFill onClick={() => actionRef.current.click()} style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }} size={16} />
    {SelectedImgAndVideo  && (
      <Flex w={"full"} mt={5} position={"relative"} justifyContent={"center"}>
        {SelectedImgAndVideo.includes("video/mp4") && <video src={SelectedImgAndVideo} alt="Selected Video" controls  />}
        {SelectedImgAndVideo.includes("image")  && (<Image src={SelectedImgAndVideo} alt="Selected Image" />)}
        <CloseButton position={"absolute"}  top={2} right={2} onClick={()=>{setSelectedImgAndVideo(null); setimgtype(null); setvideotype(null)}}/>
      </Flex>
    )}























    {/* {SelectedVideo  && (
      <Flex w={"full"} mt={5} position={"relative"} justifyContent={"center"}>
        {videotype==="video/mp4" && <video src={SelectedVideo} alt="Selected Video" controls  />}
        <CloseButton position={"absolute"}  top={2} right={2} onClick={()=>{setSelectedVideo(null);  setvideotype(null)}}/>
      </Flex>
    )}
    {SelectedImg  && (
      <Flex w={"full"} mt={5} position={"relative"} justifyContent={"center"}>
        {imgtype.includes("image")  && (<Image src={SelectedImg} alt="Selected Image" />)}
        <CloseButton position={"absolute"}  top={2} right={2} onClick={()=>{setSelectedImg(null); setimgtype(null); }}/>
      </Flex>
    )} */}
    <Button mt={5} variant={"ghost"} onClick={handleCreatePosts} isLoading={isloading}>
      POST
    </Button>
  </>)
}

export default CreatePostBody


