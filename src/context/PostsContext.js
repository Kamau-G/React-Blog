
import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const PostsContext = createContext();

function Provider({ children }) {
  // states
  const [posts, setPosts] = useState([]);
  const [categories,setCategories] =useState([{}]);
  const [featuredPosts,setFeaturedPosts]=useState([]);
  //post fetchs
  const fetchFeaturedPosts = useCallback(async () => {
    const response = await axios.get(`${process.env.REACT_APP_APISERVER}posts?_expand=user&_sort=datetime&_order=desc&_end=4`);
    setFeaturedPosts(response.data);
  }, []);

  const fetchPosts = async (id)=>{
    const response = await axios.get(`${process.env.REACT_APP_APISERVER}posts?userId=${id}&_expand=user&_sort=datetime&_order=desc&_start=0&_end=4`);
    const data = response.data;
    setPosts(data);
}

  const fetchCategories = async ()=>{
    const response = await axios.get(`${process.env.REACT_APP_APISERVER}categories?_sort=name&_order=asc`);
    const data = response.data;
    setCategories(data);
    return data;
  }
  // post edits,delete,create
  const editPostById = async (id, jsonOBJ) => {
    const response = await axios.put(`${process.env.REACT_APP_APISERVER}posts/${id}`,{...jsonOBJ});

    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, ...jsonOBJ };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const deletePostById = async (id) => {
    await axios.delete(`${process.env.REACT_APP_APISERVER}posts/${id}`);

    const updatedPosts = posts.filter((post) => {
      return post.id !== id;
    });

    setPosts(updatedPosts);
  };
// Look at this again get the userid example duckdonald is a userObj.username
  const createPost = async (postOBJ,id) => {
    const response = await axios.post(`${process.env.REACT_APP_APISERVER}posts`, {...postOBJ,userId:id});

    const updatedPosts = [...posts, response.data];
    setPosts(updatedPosts);
  };

  const valueToShare = {
    posts,categories,featuredPosts,
    deletePostById,
    editPostById,
    createPost,
    fetchPosts,
    fetchFeaturedPosts,
    fetchCategories,
  };
  return (
    <PostsContext.Provider value={valueToShare}>
      {children}
    </PostsContext.Provider>
  );
}

export { Provider };
export default PostsContext;