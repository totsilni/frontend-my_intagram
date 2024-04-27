import { useSignInWithFacebook } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useSigninWithFacebook = () => {

    const [signInWithFacebook, user, loading, error] = useSignInWithFacebook(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const handleFacebookAuth = async ()=>{
        const newUser = await signInWithFacebook();
        if(!newUser){
            showToast("Error", error.message, "error");
            return
        }

        const userRef = doc(firestore, "users", newUser.user.uid);
        const docSnap = await getDoc(userRef);
        if(docSnap.exists()){
            localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
            loginUser(docSnap.data());
        }else {
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,  
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAT: Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                showToast("Account created.", "We've created your account for you.", "success");
                loginUser(userDoc);
        }
    }
}
return {handleFacebookAuth, loading, error, user}
}

export default useSigninWithFacebook
