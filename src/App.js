import './App.css';
import {
  BrowserRouter as Router,
  Route,Routes,
  Link,
  useParams,
  useRouteMatch,
  Navigate
} from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import PostsContext from './context/PostsContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import EditUserProfile from './pages/EditUserProfile';
import EditPostPage from './pages/EditPostPage';
import UserContext from './context/UserContext';
import PostsPage from './pages/PostsPage.js';

function App(){

  const {categories,fetchCategories,fetchFeaturedPosts,posts} = useContext(PostsContext);
  const {user,} = useContext(UserContext);
  const [currentPath,setCurrentPath] = useState();
  useEffect(()=>{
    fetchCategories();
  },[])
  useEffect(()=>{
    fetchFeaturedPosts();
  },[])
  useEffect(()=>{
    const handler = (event) =>{
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate',handler);
    return ()=>{
      window.removeEventListener('popstate',handler);
    }
  },[]);
  return <div className='BG'>
    <Layout/>
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route index element={<HomePage/>}/>
      <Route path='/user' element={(user)?<EditUserProfile user={user}/>: <Navigate replace to={'/'}/>}/>
      <Route path='/posts/:id' element={<PostsPage />}/>
      <Route path='/posts/new' element={(user)?<EditPostPage user={user} />: <Navigate replace to={'/'}/>}/>
      <Route path='/posts/edit/:id' element={(user)?<EditPostPage/>: <Navigate replace to={'/'}/>}/>
    </Routes>
  </div>;
} 
export default App;
