import { useLocation,useParams } from "react-router-dom"; 
import PostHeader from "../components/PostHeader";
import parse from  'html-react-parser';

const NewPostPage = () =>{
    const location = useLocation();
    const {id} = useParams();
    const post = location.state;
    console.log(post);
    // passes post to postheader as prop
    return<>
    <h1>New Post PAGE IN PROGRESS</h1>
    <PostHeader post={post}/><br/>
    <div className="m-2 UI text-start">{}</div>
    </>
}
export default NewPostPage;