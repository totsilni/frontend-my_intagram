import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/usePostStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import userProfileStore from "../store/userProfileStore";
import usePostVideo from "../store/usePostVideo";

const usePostVideoOrImg = () => {
    const showtoast = useShowToast();
    const [isloading, setisloading] = useState(false);
    const authUser = useAuthStore((state) => { return state.user });
    const createPost = usePostStore(state => state.createPost);
    const postvideos = usePostVideo(state => state.postvideos)
    const addPost = userProfileStore((state) => state.addPost);
    const { pathname } = useLocation()
    const userProfile = userProfileStore(state => state.userProfile);

    const handleCreatePost = async (SelectedVideo, caption, SelectedImg , SelectedImgAndVideo) => {
        if (isloading) return;
        if(SelectedImgAndVideo === null){
                showtoast("Error", "Please select an video/image before post", "error");
                return
        }else{
                const IsNotSelected = SelectedImgAndVideo.includes("image") || SelectedImgAndVideo.includes("video/mp4");
                if (!IsNotSelected) {
                throw new Error("Please select an video/image")
                }
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



            if (SelectedImgAndVideo.includes("image")) {
                // const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
                console.log("image selected")
                // const postDocRef = await addDoc(collection(firestore, "postImage"), newPost);
                const selectedImgRef = ref(storage, `postImages/${postDocRef.id}`)
                // const selectedImgRef = ref(storage, `postImages/${postDocRef.id}`)

                await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
                await uploadString(selectedImgRef, SelectedImgAndVideo, "data_url");
                const downloadURL = await getDownloadURL(selectedImgRef);
                
                await updateDoc(postDocRef, { imgURL: downloadURL })


                newPost.filesURL = downloadURL;

                if(userProfile.uid === authUser.uid){
                    createPost({ ...newPost, id: postDocRef.id })
                }
                
                if(pathname !==  "/" && userProfile.uid === authUser.uid ){
                    addPost({ ...newPost, id: postDocRef.id });
                }
                
                showtoast("Successfully created", "Post created successfully", "success");
                // return
            }
            console.log("Post created successfully")
            if (SelectedImgAndVideo.includes("video/mp4")) {
                console.log("Vidoes successfully")
                // const postDocRef = await addDoc(collection(firestore, "postVideo"), newPost);
                const selectedVideoRef = ref(storage, `postVideos/${postDocRef.id}`)
                // const selectedVideoRef = ref(storage, `postVideos/${postDocRef.id}`)

                await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
                await uploadString(selectedVideoRef, SelectedImgAndVideo, "data_url");
                const downloadURL = await getDownloadURL(selectedVideoRef);

                await updateDoc(postDocRef, { videoURL: downloadURL })


                newPost.filesURL = downloadURL;
                
                // createPostVideo({ ...newPost, id: postDocRef.id })
                console.log(postvideos, "Happy");
                if(userProfile.uid === authUser.uid ){
                    createPost({ ...newPost, id: postDocRef.id })

                }

                if(pathname !== "/"  && userProfile.uid === authUser.uid ){
                    addPost({ ...newPost, id: postDocRef.id });
                }

                showtoast("Successfully created", "Post created successfully", "success");
                // return
            }
        } catch (error) {
            showtoast("Error" + error.message, "error");
        } finally {
            setisloading(false);
            console.log("done");
        }
    }

    return { handleCreatePost, isloading }
}

export default usePostVideoOrImg
