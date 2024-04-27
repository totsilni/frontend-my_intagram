import { useState } from "react"
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/usePostStore";

const useLikePost = (post) => {

    const [isUploading, setisUploading] = useState(false);
    const showtoast = useShowToast();
    const authUser = useAuthStore(state => state.user);
    const [likes, setlikes] = useState(post.likes.length);
    const [IsLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid));
    const addLike = usePostStore(state => state.addLike);
    const setLikeStatus = usePostStore(state => state.setLikeStatus);

    const handleLikePost = async () => {
        if (isUploading) {
            return
        }
        if (!authUser) {
            showtoast("Error", "You must be logged in before you Like and Unlike Posts! otherwise you will banded", "error");
            return
        }
        setisUploading(true);
        try {

            const postRef = doc(firestore, "posts", post.id);
            await updateDoc(postRef, {
                likes: IsLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });
          await addLike(post.id, authUser.id, IsLiked);
          await  setLikeStatus(post.id, IsLiked)
              setIsLiked(!IsLiked)
            IsLiked ? setlikes(likes -1) : setlikes(likes + 1);

        } catch (error) {
            showtoast("Error", error.message, "error");
        } finally {
            setisUploading(false);
        }
    }



    return {IsLiked , handleLikePost , isUploading , likes}
}

export default useLikePost