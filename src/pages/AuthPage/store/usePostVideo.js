import { create } from "zustand"

const usePostVideo = create((set) => {
    return {
        postvideos:[],
        createPostVideo: (post) => set((state) => {
            return {
                postvideos: [post, ...state.postvideos]
                //delete posts
                //addComments posts
                // Set Post
            }
        }),
        setPostVideos:(postvideos) => set({postvideos}),
    }
})


export default usePostVideo
