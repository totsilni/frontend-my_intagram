import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useSignUpWithEmailAndPassword = () => {
    const loginuser  = useAuthStore(state => state.login)
    const [createUserWithEmailAndPassword, user  ,loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const signup = async (inputs) => {

        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
            showToast("Error", "Please Fill all the fields", "error");
            return
        }

        // hs0983037@gmail.com  // check email and password
        // evilboy  // check username 
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                console.error(error)
                return
            }

            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("username", "==", inputs.username));
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty){
                showToast("Error", "Username already exists", "error");
                return 
            }

            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,  
                    email: inputs.email,
                    username: inputs.username,
                    fullName: inputs.fullname,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAT: Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                showToast("Account created.", "We've created your account for you.", "success");
                loginuser(userDoc);
            }

        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error);
        }
    }
    return { loading, error, signup }
}

export default useSignUpWithEmailAndPassword
