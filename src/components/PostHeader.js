import fern from '../images/fern.jpg';
const PostHeader = ({post}) =>{
    const myStyle={
        height: 200,
        width: 300,
    }
    return<>
        <div className='UI d-flex flex-row'>
            <div className='PL col-3'>
                <h1 className=''>{post.title}</h1>
                    
                Author - {post.user.name}
                <img src={`data:image/png;base64,${post.user.image}`} width={75} height={75}/ >
            </div>
            <div className='d-flex col-9 justify-content-end'>
                <img className='PL' src={`data:image/png;base64,${post.image}`} style={myStyle}/>
            </div>
        </div>


    </>;
}
export default PostHeader;