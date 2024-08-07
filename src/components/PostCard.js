import '../App.css';
import parse from 'html-react-parser';
import UserContext from '../context/UserContext';
import PostsContext from '../context/PostsContext';
import { useContext,useEffect } from 'react'; 
import { NavLink } from 'react-router-dom';

const PostCard = ({index, prop})=>{
const {deletePostById} = useContext(PostsContext);
const {user} = useContext(UserContext);
const date = new Date(prop.datetime);
const handleDeleteClick = ()=>{
    deletePostById(index);
}
const categoryToShow= prop.category.charAt(0).toUpperCase()+prop.category.slice(1);
return<>
<div className="UI col-3">
<div className="card">
  <img className="card-img-top" src={`data:image/png;base64,${prop.image}`} alt="Broken Image"/>
  <div className="card-body">
    <h5 className="card-title">{prop.title}</h5>
    <div className="">
      Category: {categoryToShow}<br/>
      {prop.name}
      {date.toString().slice(0,16)}
    </div>
    <div className="card-text">{parse(prop.content.slice(0,100))}</div>
    <NavLink className='btn btn-info' to={`/posts/${prop.id}`} state={prop}>expand</NavLink>
    {(user)?<NavLink to={`/posts/edit/${prop.id}`} state={prop} className="btn btn-primary">edit</NavLink>:''}
    {(user)?<button className='btn btn-danger' onClick={handleDeleteClick}>x</button>:''}

  </div>

</div>
</div>
</>;
}
export default PostCard;