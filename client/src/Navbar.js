import { Link, useNavigate } from "react-router-dom";
// import"./Navbar.css";
import"./Navbar.css";
import"./home.css";

function Navbar()
{
  let navigate=useNavigate();
  function change()
  {
    // api call
    navigate("/Products");
  }
    return(
        <>
          <nav>
            <h1>BEAST</h1>
       
            <Link to="/">Home</Link>
            <Link to="/Products">Products</Link>
            <Link to="/Contact">Contact</Link>
            {/* <li onClick={change}>Products</li> */}
            
          </nav>
        </>
    );
}
export default Navbar;
