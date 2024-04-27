import { useState } from "react";
import useShowToast from "./useShowToast";

const useVideoUpload = () => {

    const [SelectedVideo, setSelectedVideo] = useState(null);
    const [imgtype, setimgtype] = useState(null)
    const [videotype, setvideotype] = useState(null)
    const maxSizeofVideoInMB = 19.9 * 1024 * 1024;
    const showtoast = useShowToast();
    const handlePostMedia = (e)=>{
        const file= e.target.files[0];
        if(file && file.type.startsWith("video/mp4") || file.type.startsWith("image/")){
            if(file > maxSizeofVideoInMB){
                showtoast("Error", "File size much be less then 20MB", "error");
                setSelectedVideo(null);
                return
            }
            if(file.type.startsWith("video/mp4")){
                setvideotype(file.type);
                console.log(file.type);
            }
            if(file.type.startsWith("image/")){
                setimgtype(file.type);
                console.log(file.type);
            }
            const reader = new FileReader();
            reader.onload =()=>{
                setSelectedVideo(reader.result);
            }
            reader.readAsDataURL(file);
        }else{
            showtoast("Error", "Please select a Video or Image file", "error");
        }
    }
  return {setSelectedVideo, SelectedVideo, handlePostMedia, setimgtype, imgtype ,videotype}
}

export default useVideoUpload
