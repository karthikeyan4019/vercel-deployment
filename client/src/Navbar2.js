import { Link } from "react-router-dom";

function Navbar2()
{
    return(
        <>
        <nav>
            <h1>BEAST</h1>
            <Link to="/">AMAZON</Link>
            <Link to="/Flipkart/">FLIPKART</Link>
            <Link to="/Snapdeal">SNAPDEAL</Link>
        </nav>
        </>
    );

}
export default Navbar2;