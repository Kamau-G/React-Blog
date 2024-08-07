import '../App.css';
import UserContext from '../context/UserContext';
import { useContext,useEffect } from 'react';
import Header from '../components/Header';
import PostList from '../components/PostList'
const HomePage=()=>{
    const {user,fetchUser} = useContext(UserContext);
    // useEffect(()=>{
    //     fetchUser();
    // },[]);
    return<><div className="">
        <Header/>
        <h2>{(user)?'My Posts':'Featured Posts'}</h2>
        <PostList user={user}/>
        </div></>;
}
export default HomePage;