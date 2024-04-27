import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast"
import usePostStore from "../store/usePostStore";
import userProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPost = () => {

    const [isloading, setisloading] = useState(true)
    const showtoast = useShowToast();
    const authUser = useAuthStore(state => state.user);
    const { posts, setPosts } = usePostStore();
    const { setUserProfile } = userProfileStore();
    useEffect(() => {
        const getFeedPost = async () => {
            setisloading(true);
            if (authUser.following.length === 0) {
                setisloading(false);
                setPosts([]);
                return
            }

            const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following));

            try {
                const querySnapshot = await getDocs(q);
                const FeedPost = [];
                querySnapshot.forEach((post) => {
                    FeedPost.push({ id: post.id, ...post.data() });
                })
                FeedPost.sort((a, b) => {
                    return (b.createdAt - a.createdAt)
                })
                setPosts(FeedPost);
            } catch (error) {
                showtoast("Error", error.message, "error");
            } finally {
                setisloading(false);
                
            }
        }
        if (authUser) {
            getFeedPost();
        }
    }, [authUser, showtoast, setPosts, setUserProfile])

    return { isloading, posts, setPosts }
}

export default useGetFeedPost
