import '../App.css';
import fern from '../images/fern.jpg';
const Header= ({})=>{
    const myStyle={
        height: 150,
        width: 400,
    }
    return<>
        <img className='UI m-1' src={fern} style={myStyle}/>
    </>;
}
export default Header;