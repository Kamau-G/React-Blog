import '../App.css';
import UserContext from '../context/UserContext';
import PostsContext from '../context/PostsContext';
import { useContext,useEffect } from 'react';
import PostCard from './PostCard';
const PostList = ({user})=>{
    let output = {};
    let renderedPosts;
    let postsToRender;
    const {posts,fetchPosts,featuredPosts,fetchFeaturedPosts} = useContext(PostsContext);
    useEffect(()=>{
        (async () =>{
            fetchFeaturedPosts();
            fetchPosts();}
        )()
    },[]);
    useEffect(()=>{
    },[user]);
    console.log(user?true:false,posts);
    postsToRender = (user)? posts:featuredPosts;
    renderedPosts = postsToRender.map((post)=>{
        return <PostCard key={post.id} index={post.id} prop={post}/>;
    })
    
return<>
<div className="d-flex justify-content-center PL">{renderedPosts}</div>
</>;

}
export default PostList;