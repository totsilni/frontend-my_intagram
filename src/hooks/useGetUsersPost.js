import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import usePostStore from "../store/usePostStore";
import userProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUsersPost = () => {

    const [isloading, setisloading] = useState(true);
    const showtoast = useShowToast();
    const { posts, setPosts } = usePostStore();
    const userProfile = userProfileStore((state) => { return state.userProfile });

    useEffect(() => {
        const getPost = async () => {
            if (!userProfile) {
                return
            }

            setisloading(true);
            setPosts([]);

            try {
                // get all post from database with the help of userprofile.uid
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));

                const querySnapshot = await getDocs(q);
                const Posts = []

                querySnapshot.forEach((doc) => {
                    Posts.push({ ...doc.data(), id:doc.id });
                });

                Posts.sort((a, b) => { return (b.createdAt - a.createdAt); });
                console.log("post Image colections  ", Posts)
                setPosts(Posts);
            } catch (error) {
                showtoast("Error", error.message, "error");
                setPosts([]);
            } finally {
                setisloading(false);
            }
        }

        getPost();
    }, [setPosts , userProfile, showtoast])

    return { posts, isloading }
}

export default useGetUsersPost
