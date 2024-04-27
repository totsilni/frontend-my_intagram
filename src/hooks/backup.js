const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

const userDocRef = doc(firestore, 'users', authUser.uid);
const selectedfileRef = ref(storage, `posts/${postDocRef.id}`)

await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
await uploadString(selectedfileRef, SelectedVideo, "data_url");
const downloadURL = await getDownloadURL(selectedfileRef);

await updateDoc(postDocRef, { filesURL: downloadURL })


newPost.filesURL = downloadURL;

createPost({ ...newPost, id: postDocRef.id })
addPost({ ...newPost, id: postDocRef.id });

showtoast("Successfully created", "Post created successfully", "success");