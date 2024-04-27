import { useEffect, useState } from "react"
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import userProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
    const {userProfile, setUserProfile} = userProfileStore();
    const [isloading, setisloading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async()=>{
            setisloading(true);
            try {
                const q = query(collection(firestore, "users"), where("username", "==", username)); 
                const querySnapshot = await getDocs(q);
                if(querySnapshot.empty){
                    return setUserProfile(null);
                }
                console.log(querySnapshot);
                let userdoc;
                querySnapshot.forEach((doc)=>{
                    userdoc = doc.data();
                    console.log("DDD   " , userdoc);
                })
                setUserProfile(userdoc);
            } catch (error) {
                showToast("Error", error.message, "error");
            }finally{
                setisloading(false);
            }
        }
        getUserProfile();
    }, [setUserProfile, showToast , username])

  return {isloading, userProfile}
}

export default useGetUserProfileByUsername
