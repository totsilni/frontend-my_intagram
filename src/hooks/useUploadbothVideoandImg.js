import { useState } from "react";
import useShowToast from "./useShowToast";

const useUploadbothVideoandImg = () => {

    const [SelectedVideo, setSelectedVideo] = useState(null);
    const [SelectedImg, setSelectedImg] = useState(null);
    const [SelectedImgAndVideo, setSelectedImgAndVideo] = useState(null);
    const [imgtype, setimgtype] = useState(null)
    const [videotype, setvideotype] = useState(null)
    const maxSizeofVideoInMB = 19.9 * 1024 * 1024;
    const showtoast = useShowToast();
    const handlePostMedia = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("video/mp4") || file.type.startsWith("image/")) {
            if (file > maxSizeofVideoInMB) {
                showtoast("Error", "File size much be less then 20MB", "error");
                setSelectedVideo(null);
                setSelectedImg(null);
                setSelectedImgAndVideo(null);
                return
            }
            if (file.type.startsWith("video/mp4")) {
                const reader = new FileReader();
                reader.onload = () => {
                    setSelectedImgAndVideo(reader.result);
                }
                reader.readAsDataURL(file);
                setvideotype(file.type);
            }
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = () => {
                    setSelectedImgAndVideo(reader.result);
                }
                reader.readAsDataURL(file);
                setimgtype(file.type);
            }

        } else {
            showtoast("Error", "Please select a Video or Image file", "error");
        }
    }
    return { setSelectedVideo, SelectedVideo, setSelectedImgAndVideo , SelectedImgAndVideo, handlePostMedia, setimgtype, imgtype, videotype , SelectedImg , setSelectedImg }
}

export default useUploadbothVideoandImg
