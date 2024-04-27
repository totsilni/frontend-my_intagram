import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUser = () => {
    const [isloading, setIsloading] = useState(true);
    const [SuggestedUsers, setSuggestedUsers] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const showtoast = useShowToast();


    useEffect(() => {
        const getSuggestUsers = async ()=>{
            try {
                // collected all the User from the database which give suggestion which is not following by the user and also user owe profile 
                setIsloading(true);
                const userRef= collection(firestore, "users");
                // it give all give in suggestion user limited in range 3
                const q = query(userRef, where("uid", "not-in", [authUser.uid,...authUser.following]), orderBy("uid"), limit(3));
                const querySnapshot = await getDocs(q);
                const users = [];
                querySnapshot.forEach((user) => {
                    users.push({...user.data(), id:user.id});
                })
                setSuggestedUsers(users);
            } catch (error) {
                showtoast("Error", error.message, "error");
            }finally{
                setIsloading(false);
            }
        }
        if(authUser){
            getSuggestUsers();
        }
    }, [authUser, showtoast])
    

  return {isloading, SuggestedUsers}
}

export default useGetSuggestedUser
