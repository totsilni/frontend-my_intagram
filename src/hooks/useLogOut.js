import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogOut = () => {
    const logoutUser =  useAuthStore((state)=> state.logout);
    const [signOut, islogingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const handlelogout = async () => {
        try {
            await signOut();
            localStorage.removeItem("user-info")
            logoutUser();
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return { handlelogout, islogingOut, error };
}

export default useLogOut
