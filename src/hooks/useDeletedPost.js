import { useState } from 'react'
import useAuthStore from '../store/authStore';
import usePostStore from '../store/usePostStore';
import userProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { deleteObject, ref } from 'firebase/storage';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../firebase/firebase';

const useDeletedPost = (post, img, video) => {

    const authuser = useAuthStore(state => state.user);
    const deletePost = usePostStore(state => state.deletePost);
    // const userProfile = userProfileStore(state => state.userProfile);
    const decramentPostCount = userProfileStore(state => state.deletePosts);
    const showtoast = useShowToast()
    const [isDeleting, setisDeleting] = useState(false);
    
    const handleDeletePost = async()=>{

        if(!window.confirm('Are you sure you want to delete ?')){
             return
        }
        if(isDeleting){
            return
        }
        setisDeleting(true)
        try {
            if(img){
                const imgRef  = ref(storage, `postImages/${post.id}`)
                await deleteObject(imgRef)
                const userRef = doc(firestore, "users", authuser.uid);
                await deleteDoc(doc(firestore, "posts", post.id))
                await updateDoc(userRef, {
                    posts:arrayRemove(post.id)
                })
                deletePost(post.id);    // it deletes the post object from the post store
                decramentPostCount(post.id);   // it deletes the posts number from the userprofile store 
                showtoast("Post deleted", "Past successfully deleted", "success");
            }
            if(video){
                const imgRef  = ref(storage, `postVideos/${post.id}`)
                await deleteObject(imgRef)
                const userRef = doc(firestore, "users", authuser.uid);
                await deleteDoc(doc(firestore, "posts", post.id))
                await updateDoc(userRef, {
                    posts:arrayRemove(post.id)
                })
                deletePost(post.id);
                decramentPostCount(post.id);
                showtoast("Post deleted", "Post successfully deleted", "success");
            }
        } catch (error) {
            showtoast("Error", error.message, "error")
        }finally{
            setisDeleting(false);
        }
    }

  return {handleDeletePost, isDeleting}
    
}

export default useDeletedPost
