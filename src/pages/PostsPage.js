import { useLocation,useParams } from "react-router-dom"; 
import PostHeader from "../components/PostHeader";
import parse from  'html-react-parser';

const PostsPage = () =>{
    const location = useLocation();
    const {id} = useParams();
    const post = location.state;
    // passes post to postheader as prop
    return<>
    <PostHeader post={post}/><br/>
    <div className="m-2 UI text-start">{parse(post.content)}</div>
    </>
}
export default PostsPage;