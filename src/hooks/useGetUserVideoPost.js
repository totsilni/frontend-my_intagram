import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import userProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostVideo from "../store/usePostVideo";

const useGetUsersPost = () => {

    const [isloading1, setisloading1] = useState(true);
    const showtoast = useShowToast();
    const { postvideos, setPostVideos } = usePostVideo();
    const userProfile = userProfileStore((state) => { return state.userProfile });

    useEffect(() => {
        const getPost = async () => {
            if (!userProfile) {
                return 
            }

            setisloading1(true);
            setPostVideos([]);

            try {
                // get all post from database with the help of userprofile.uid
                const videos = query(collection(firestore, "postVideo"), where("createdBy", "==", userProfile.uid));

                const querySnapshot2 = await getDocs(videos);
                const PostsVideo = []

                querySnapshot2.forEach((doc) => {
                    PostsVideo.push({ ...doc.data(), id:doc.id });
                });

                PostsVideo.sort((a, b) => { return (b.createdAt - a.createdAt); });
                console.log("post video colections  ", PostsVideo)
                setPostVideos(PostsVideo);
            } catch (error) {
                showtoast("Error", error.message, "error");
                setPostVideos([]);
            } finally {
                setisloading1(false);
            }
        }

        getPost();
    }, [setPostVideos , userProfile, showtoast])

    return {postvideos, isloading1}
}

export default useGetUsersPost
