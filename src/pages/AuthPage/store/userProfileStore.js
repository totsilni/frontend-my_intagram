import { create } from "zustand"


const userProfileStore = create((set) => { return {
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    //  This is used to update the number of users profile post page
    addPost:(post) => set(state => ({
        userProfile: {...state.userProfile,posts:[post.id, ...state.userProfile.posts]}
    })),
    deletePosts:(postId) => set(state => ({userProfile: {...state.userProfile, posts: state.userProfile.posts.filter(id => id !==postId)}})),
}})

export default userProfileStore
