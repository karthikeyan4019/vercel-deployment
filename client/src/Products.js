import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import"./pages.css";

function Products()
{
  let{Productname}=useParams();
    return(
        <>
        {/* <Navbar/> */}
        <h1>PRODUCTS Name:{Productname}</h1>
        <img src="https://images.pexels.com/photos/10908496/pexels-photo-10908496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="image2" />

        </>
    );
}
export default Products;