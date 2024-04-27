import { useEffect, useState } from "react"
import useShowToast from "./useShowToast";
import {  doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
    const [isloading, setisloading] = useState(true)
    const [userProfile, setuserProfile] = useState(null);
    const showtoast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            setisloading(true)
            console.log("After exists",userProfile);
            setuserProfile(null);
            try {
                const userRef = await getDoc(doc(firestore, "users", userId));
                if(userRef.exists()){
                    setuserProfile(userRef.data());
                    console.log("Before Exist",userRef.data());
                }
                console.log("After exists",userRef.data());
            } catch (error) {
                showtoast("Error", error.message, "error");
            }finally{
                setisloading(false);
            }
        }
        getUserProfile();
    }, [showtoast, setuserProfile , userId])

    return {userProfile, isloading, setuserProfile}
}

export default useGetUserProfileById
