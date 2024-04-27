import { useState } from 'react'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/usePostStore';

const useCommentsPost = () => {
    const [iscommenting, setiscommenting] = useState(false);
    const showtoast = useShowToast();
    const authuser = useAuthStore(state => state.user);
    const addComments = usePostStore(state => state.addComment)

    const handlePostComment = async(postId, comment)=>{
        if(iscommenting) {
            return
        }
        if(!authuser){
            showtoast("Error", "You must be logged in before Commenting to other users", "error");
            return
        }
        setiscommenting(true);
        const newComment = {
           comment,
           createdAt: Date.now(),
           createdBy: authuser.uid,
           postId
        }

        try {
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment)
            })
            await  addComments(postId, newComment)

        } catch (error) {
        showtoast("Error", error.message, "error");    
        }finally{
            setiscommenting(false);
        }
    }

  return {handlePostComment, iscommenting}
}

export default useCommentsPost
