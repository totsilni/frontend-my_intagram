import { useState } from "react"
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [SelectedFile, setSelectedFile] = useState(null);
    const showtoast = useShowToast();
    const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")){
            if(file.size > maxFileSizeInBytes){
                showtoast("Error", "File size much be less then 2MB", "error");
                setSelectedFile(null);
                return
            }
            // Main function of file selection 
            const reader = new FileReader();
            reader.onload =()=>{
                setSelectedFile(reader.result)
            }
            reader.readAsDataURL(file);
        }else {
            showtoast("Error", "Please Select an Image File", "error");
            setSelectedFile(null)
        }
    }

  return  {SelectedFile, handleImageChange, setSelectedFile};
}

export default usePreviewImg
