import { useContext,useState } from "react";
import {useForm,}from"react-hook-form";
import UserContext from "../context/UserContext";
import PostsContext from "../context/PostsContext";


const EditUserProfile = ({user}) =>{
    //form defaults and control
    const {register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            id:user.id,
            name:user.name,
            userName: user.userid,
            email: user.email,
            bio: user.bio,
            password: user.password,
            passwordIn: user.password,
            passwordIn2: user.password,
            image: user.image
        }
    });
    const {editUserById,fetchUser} = useContext(UserContext);
    const {categories,} = useContext(PostsContext);

    //#region Convert image to 64bit string
    const [image, setImage] = useState(user.image);
    function convertImageToBase64(imgUrl, callback) {
        const image = new Image();
        image.crossOrigin='anonymous';
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.height = image.naturalHeight;
            canvas.width = image.naturalWidth;
            ctx.drawImage(image, 0, 0);
            const dataUrl = canvas.toDataURL();
            callback && callback(dataUrl)
        }
        image.src = imgUrl;
    }
    const handleFileChange = (event) => {
        const file = URL.createObjectURL(event.target.files[0]);
        convertImageToBase64(file, removeTypeAndSave)
    }
    const removeTypeAndSave = (base64Image) => {
        const updatedImage = base64Image.replace(
        "data:image/png;base64,", "" );
        setImage(updatedImage);
    }
    //#endregion


    // I need to add the default values of the user in the form finish validation if the data is erased. 
    // Finally update the user if there are any changes
    return<>
    <h1>Edit User Profile</h1>
    <div className="">
    <div className="d-flex justify-content-center">
        <form className="text-start col-7  UI" onSubmit={handleSubmit((data)=>{
            const userObj = {
                id: data.id,
                name: data.name,
                userid: data.userName,
                email: data.email,
                bio: data.bio,
                password: data.passwordIn2,
                /*image: data.image,*/
            };
            editUserById(data.id,userObj);
            user = fetchUser(userObj.userid,userObj.password);
            console.log(userObj);
        })}>
            <div className="m-1">
            <label className="col-3">Id: </label>
            <input {...register("id")}placeholder={user.id} readOnly disabled/>
            </div>
            <div className="m-1">
            <label className="col-3">Name: </label>
            <input {...register("name",{required: "This is Required."})} placeholder={user.name}/>
            <>{errors.name?.message}</>
            </div>
            <div className="m-1">
            <label className="col-3">User Name: </label>
            <input {...register("userName")} placeholder={user.userid}/>
            </div>
            <div className="m-1">
            <label className="col-3"  >Email:</label>
            <input {...register("email",{required: true})} placeholder={user.email}/>
            </div>
            <div className="m-1">
            <label className="col-3">Bio: </label>
            <input {...register("bio",{required: true})} placeholder={user.bio}/>
            </div>
            <div className="m-1">
            <label className="col-3">Password:  </label>
            <input {...register("password")} placeholder={user.password} readOnly disabled/>
            </div>
            <div className="m-1">
            <label className="col-3">New Password:  </label>
            <input {...register("passwordIn" ,{required: "This is required", minLength: {
                value: 6,
                message: "Must be longer than 6 Characters"
            }})} placeholder={user.password} />
            </div>
            <div className="m-1">

            <label className="col-3">Confirm Password:  </label>
            <input {...register("passwordIn2" ,{required: "The Passwords must match"})} placeholder={user.password} />
            </div>
            <div className="m-1">
            <label className="col-3">Image:  </label>
            <input type="file" onChnage={()=>handleFileChange()}/>
            </div>

            <div className="m-1">
            <input type="submit"/>
            </div>
    
        </form>
    </div>
    </div>
    </>
}
export default EditUserProfile;