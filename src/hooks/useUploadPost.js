import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/usePostStore";
// import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import userProfileStore from "../store/userProfileStore";

const useUploadPost = () => {
    const showtoast = useShowToast();
    const [isloading, setisloading] = useState(false);
    const authUser = useAuthStore((state) => { return state.user });
    const createPost = usePostStore(state => state.createPost);
    const addPost = userProfileStore((state) => state.addPost);
    // const { pathname } = useLocation()

    const handleCreatePost = async (SelectedVideo, caption) => {
        if(isloading) return;
        if (!SelectedVideo) {
            throw new Error("Please select an video/image")
        }
        setisloading(true);
        const newPost = {
            caption: caption || "",
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        }

        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

            const userDocRef = doc(firestore, 'users', authUser.uid);
            const selectedfileRef = ref(storage, `posts/${postDocRef.id}`)

            await updateDoc(userDocRef, {posts:arrayUnion(postDocRef.id)});
            await uploadString(selectedfileRef, SelectedVideo, "data_url");
            const downloadURL = await getDownloadURL(selectedfileRef);

            await updateDoc(postDocRef, {filesURL:downloadURL})


            newPost.filesURL = downloadURL;

            createPost({...newPost, id:postDocRef.id})
            addPost({...newPost, id:postDocRef.id});

            showtoast("Successfully created", "Post created successfully", "success");
        } catch (error) {
            showtoast("Error" + error, "error");
        } finally {
            setisloading(false);
        }
    }

    return {handleCreatePost, isloading }
}

export default useUploadPost
