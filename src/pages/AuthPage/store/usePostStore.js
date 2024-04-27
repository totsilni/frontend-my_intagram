import { create } from "zustand";

const usePostStore = create((set) => {
    return {
        posts: [],
        createPost: (post) => set((state) => { return { posts: [post, ...state.posts] } }),
        deletePost: (id) => set(state => ({ posts: state.posts.filter(post => post.id !== id) })),
        setPosts: (posts) => set({ posts }),
        addComment: (postId, comment) => set((state) => ({
            posts:state.posts.map((post) => {
                if(post.id === postId){ 
                return {
                    ...post,
                    comments:[comment, ...post.comments]
                }
            }
            return post;
        })
    })),
        addLike: (postId, like , IsLiked) => set((state) => ({
            posts:state.posts.map((post) => {
                if(post.id === postId){ 
                return {
                    ...post,
                    likes:IsLiked ? state.posts.filter(post => post.likes.id !== like) : [like, ...post.likes]
                }
            }
            return post;
        })
    })),
        setLikeStatus: (postId, IsLiked) => set((state) => ({
            posts:state.posts.map((post) => {
                if(post.id === postId){ 
                return {
                    ...post,
                    likeStatus:!IsLiked
                }
            }
            return post;
        })
    }))
    }
})

export default usePostStore
