import { useLocation,useParams } from "react-router-dom"; 
import PostHeader from "../components/PostHeader";
import parse from  'html-react-parser';
import {useForm,}from"react-hook-form";
import DatePicker from 'react-datepicker';
import { useState,useContext } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PostsContext from "../context/PostsContext";
import UserContext from "../context/UserContext";

const EditPostPage = ({user}) =>{
    const [dateIn,setDate] = useState(new Date());
    const location = useLocation();
    const {id} = useParams();
    const {createPost,editPostById} = useContext(PostsContext);
    const post = location.state;
    const {register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            id: (post)?post.id:"",
            date: (post)?post.datetime:new Date().toString().slice(0,15),
            title: (post)?post.title:"",
            category: (post)?post.category:"",
            content: (post)?post.content:"",
        }
    });
    let mutablePost = post?{...post}:{};
    return<>
    <h1>{(post)?"Edit Post":"New Post"}</h1>
    <div className="d-flex justify-content-center">
        <form className="text-start col-7  UI" onSubmit={handleSubmit((data)=>{
            const postObj ={
                title: data.title,
                datetime: data.date,
                category: data.category,
                content: mutablePost.content
            }
            console.log(postObj,data.id);
            post?editPostById(data.id,postObj):createPost(postObj,user.id);
        })}>
            <div className="m-1">
                <label className="col-3">Id: </label>
                <input {...register("id")} readOnly disabled/>
            </div>
            <div className="m-1">
                <label className="col-3">Date: </label>
                <input {...register("date")} onChange={(dateIn)=>{mutablePost.datetime=dateIn;} }disabled/>               
            </div>
            <div className="m-1">
                <label className="col-3">Title:  </label>
               <input {...register("title")} onChange={(event)=>mutablePost.title=event.target.value} />
            </div>
            <div className="m-1">
                <label className="col-3">Category:  </label>
                {/* <input {...register("category" ,{required: "This is required"})}/> */}
                <input {...register("category")} onChange={(value)=>{mutablePost.category=value;}}/>
             
            </div>
            <div className="m-1">

            <label className="col-3">Content:  </label>
            <ReactQuill {...register("content")} theme="snow" onChange={(value)=>{mutablePost.content=value;}}/>
            </div>
            <div className="m-1">
            <label className="col-3">Image:  </label>
            <input type="file"/>
            </div>

            <div className="m-1">
            <input type="submit"/>
            </div>
    
        </form>
    </div>
    {/*
    <PostHeader post={post}/><br/>
    <div className="m-2 UI text-start">{parse(post.content)}</div>
    */}
    </>
}
export default EditPostPage;