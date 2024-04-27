import { auth, firestore } from "../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
const useSignInwithGoogle = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const handleGoogleAuth = async () => {
        try {
            const newUsers = await signInWithGoogle()
            console.log(newUsers);
            if (!newUsers && error) {
                showToast("Error", error.message, "error");
                return
            }
            const userRef = doc(firestore, "users", newUsers.user.uid);
            const docSnap = await getDoc(userRef);
            if(docSnap.exists()){
                // Log In
                const userDoc = docSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc); 
            }else {
                // SignUP
                const userDoc = {
                    uid: newUsers.user.uid,
                    email: newUsers.user.email,
                    username: newUsers.user.email.split('@')[0],
                    fullName: newUsers.user.displayName,
                    bio: "",
                    profilePicURL:newUsers.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAT: Date.now(),
                }
                await setDoc(doc(firestore, "users", newUsers.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                showToast("Account created.", "We've created your account for you.", "success");
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error)
            return
        }
    }
    return {handleGoogleAuth, error, loading, user}
}

export default useSignInwithGoogle
