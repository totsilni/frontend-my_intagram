import { collection, getDocs, query, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";
import { useState } from "react";

const useSearchUser = () => {

    const [isloading, setisloading] = useState(false);
    const [User, setUser] = useState(null);
    const showtoast = useShowToast();

    const GetUserProfile = async (username) => {
        setisloading(true);
        setUser(null);
        try {
            const q = query(collection(firestore, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);
            // If user not found in the database then give the message user not found 
            if(querySnapshot.empty){
                showtoast("Error", "User not found", "error");
                setUser(null);
            }
            // If the user is found in the database then give the data to the user
            querySnapshot.forEach((doc) => {
                    setUser(doc.data());
            });

        } catch (error) {
            showtoast("Error", error.message, "error");
            setUser(null);
        } finally {
            setisloading(false);
        }
    }

    return {GetUserProfile, isloading , User, setUser}
}

export default useSearchUser
