import '../App.css';
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import PostsContext from '../context/PostsContext';
const Login= ({onSubmit})=>{
    const {user,fetchUser}= useContext(UserContext);
    const {posts,fetchPosts}= useContext(PostsContext);
    const [userID,setUserID] = useState();
    const [password,setPassword] = useState();
    const [error, setError] = useState(false);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        const userlogged = await fetchUser(userID,password);
        // setError((user)?fetchPosts(user["id"]):true);
        fetchPosts(userlogged.id);
        setUserID('');
        setPassword('');
        onSubmit();
    }
    return<>
    <div className='UI'>
        <form className='d-flex flex-col flex-wrap'>
        {(error)?<div className='Error'>Something Went Wrong!</div>:''}
        <div className=' '>
        <label>User ID:</label>
        <input className='' value={userID} onChange={(event)=>{
            setUserID(event.target.value.replace(/#/i,''));
            }}
        />
        </div>
        <div className=''>
        <label>Password:</label>
        <input className='' value={password} onChange={(event)=>{
        setPassword(event.target.value.replace(/#/i,''));}} 
        />
        </div>
        <div className=''>
        <button type='submit' onClick={handleSubmit}>submit</button>
        </div>
        </form>
        </div>
    </>;
}
export default Login;