import { useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import userProfileStore from "../store/userProfileStore";
// How to upadate data in firestore 
const useEditProfile = () => {
    const [isuploading, setisuploading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = userProfileStore((state) => state.setUserProfile);
    const showtoast = useShowToast();

    const editprofile = async (inputs, selectedFile) => {
        if (isuploading || !authUser) {
            showtoast("Error", "You are not allowed to edit this profile", "error");
            return
        }
        setisuploading(true);

        const storage = getStorage();
        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, `users`, authUser.uid);
        let URL = "";
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, 'data_url');
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }

            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL
            }

            // Set the "capital" field of the city 'DC'
            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showtoast("Success","Profile Uploaded Successfully", "success" )
        } catch (error) {
            showtoast("Error", error.message, "error")
        }finally{
            setisuploading(false);
        }
    }
    return {isuploading, editprofile}
}

export default useEditProfile
