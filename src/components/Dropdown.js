import Dropdown from 'react-bootstrap/Dropdown';
import PostsContext from '../context/PostsContext'
import { useContext } from 'react';
function categoriesDrop() {
/*const dropdownItems = categories.map((cat,id)=>{
    return <Dropdown.Item key={id} value={cat}/>;
});*/
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Categories
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default categoriesDrop;