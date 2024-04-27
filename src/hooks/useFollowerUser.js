import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore";
import userProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollowerUser = (userId) => {
    const [isuploading, setisuploading] = useState(false);
    const [isfollowing, setisfollowing] = useState(false);
    const { user, setUser } = useAuthStore();
    const { userProfile, setUserProfile } = userProfileStore();
    const showToast = useShowToast();

    useEffect(() => {
        if (user) {
            const isfollowing = user.following.includes(userId)
            setisfollowing(isfollowing)
        }
    }, [user, userId])

    const handlefollowUser = async () => {
        setisuploading(true);
        try {
            // Colloected the data of Own Users and another user from the database

            const currentUserRef = doc(firestore, "users", user.uid);
            const useToFollowOrUnfollowRef = doc(firestore, "users", userId);

            // troggle the follower and following when the handlefollowUser call 
            await updateDoc(currentUserRef, {
                following: isfollowing ? arrayRemove(userId) : arrayUnion(userId),
            });

            await updateDoc(useToFollowOrUnfollowRef, {
                followers: isfollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
            });

            // update the data in Firestore, UserProfile and localStorage
            if (isfollowing) {
                // then unfollow users
                setUser({
                    ...user,
                    following: user.following.filter((uid) => {
                        return uid !== userId;
                    })
                })
                if(userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter((uid) => {
                            return uid !== user.uId;
                        })
                    })
                }                

                localStorage.setItem('user-info', JSON.stringify({
                    ...user,
                    following: user.following.filter((uid) =>{
                        return uid !== userId;
                    })
                }));
                setisfollowing(false);
            } else {
                // then follow users
                setUser({
                    ...user,
                    following: [...user.following, userId]
                });
                
                if(userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, user.uId]
                    });
                }
                localStorage.setItem('user-info', JSON.stringify({
                    ...user,
                    following: [...user.following, userId]
                }));
                setisfollowing(true);
                }
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setisuploading(false);
        }
    }
    return { isfollowing, isuploading, handlefollowUser }
}

export default useFollowerUser
