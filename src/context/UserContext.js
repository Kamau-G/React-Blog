import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
//
const UserContext= createContext();
function Provider ({children}){
    const [user,setUser]=useState();

    const fetchUser=async(userName,password)=>{
        const getResponse = await axios.get(`${process.env.REACT_APP_APISERVER}users?userid=${userName}&password=${password}`);
        const data = (getResponse)? getResponse.data["0"]:null;
        setUser(data);
        return {...data};
    }
    const editUserById = async (id, jsonOBJ) => {
        const putResponse = await axios.put(`${process.env.REACT_APP_APISERVER}users/${id}`,{...jsonOBJ});
        setUser((putResponse.statusText==='OK')?jsonOBJ:user);
      };
    const createUser = async (userOBJ)=>{
    const postResponse = await axios.post(`${process.env.REACT_APP_APISERVER}users`,{...userOBJ});
    setUser((postResponse.statusText==='OK')?userOBJ:user);
    }
    const resetUser = async ()=>{

    setUser();
    }
    const valueToShare ={
        user,setUser,
        fetchUser,
        editUserById, 
        createUser,
        resetUser
    };
    return<>
    <UserContext.Provider value={valueToShare}>
        {children}</UserContext.Provider>
    </>;
}
export { Provider };
export default UserContext;