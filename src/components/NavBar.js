//#region imports
import '../App.css';

import { useState,useContext} from 'react';
import Login from './Login';
import UserContext from '../context/UserContext';
import { NavLink,useLocation } from 'react-router-dom';
//#endregion

const NavBar= ({props})=>{
    const {user,setUser,createUser,resetUser} = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    
    const handleClick = () =>{
        // if(user){resetUser();}
        setShowLogin(!(showLogin)? true:(showLogin)?false:resetUser());
    };
    const handleLoginSubmit = () =>{
        setShowLogin(false);
    };
    //ADD a BRAND LOGO VIA THE ROOT
    return<>
    <div className='PL d-flex justify-content-end mb-1'>
    <NavLink className='btn btn-primary' to='/' >Home</NavLink>

    {(showLogin&& user)?<button className='btn btn-danger'onClick={()=>{resetUser()}}>Logout</button>:''}
    <NavLink className='btn btn-primary' to='/posts/new' >Post</NavLink>
    <NavLink className='btn btn-primary' to='/user'>Edit Profile</NavLink>
    <button className='btn btn-primary'onClick={handleClick}>{(showLogin)?'Close':'Login'}</button>
    <div className=''>
    {(showLogin)?<Login onSubmit={handleLoginSubmit}/>:''}
    </div>
    </div>
    </>;
}
export default NavBar;