import { Link, useNavigate,useParams } from "react-router-dom";
import { useEffect, useState} from "react";
// redux
import { useDispatch,useSelector } from "react-redux";
import { setUsers } from "./slices/userSlice";
// css
import"./Header.css";

function Header()
{
  let navigate=useNavigate();
  let dispatch=useDispatch();
  let chct=useSelector((state)=>
    {
       return(state.userInfo.users[0].chct);
    });
  let st=useSelector((state)=>
    {
      return(state.userInfo.users[0].st);
    });
  // function change()
  // {
  //   // api call
  //   navigate("/Products");
  // }
  let{userName}=useParams();
  let[category,setCategory]=useState([]);
  let[choosedCategory,setChoosedCategory]=useState("");
  let[search,setSearch]=useState("");
  let[min_price,setMin_price]=useState("");
  let[max_price,setMax_price]=useState("");
  let[entireProducts,setEntireProducts]=useState([]);
  let[stateReset,setStateReset]=useState("");
  // redux value
  let username=useSelector((state)=>
    {
      return(state.loginInfo.login[0].username);
    });
  let [forminput,setForminput] = useState(
  {
    choosedCategory:choosedCategory,
    search:search,
  }
  );
  useEffect(()=>{
    async function fun()
    {
        try
        {
          let responsemetadata=await fetch("http://localhost:8000/api/v1/category"); 
          let actualdata=await responsemetadata.json();
          // console.log(actualdata);
          let totalProducts=await fetch(`http://localhost:8000/api/v1/filter?category=${encodeURIComponent(choosedCategory)}&search=${encodeURIComponent(search)}&min_price=${encodeURIComponent(min_price)}&max_price=${encodeURIComponent(max_price)}`); 
          let totalProductsData=await totalProducts.json();
          // console.log(totalProductsData);
          if(actualdata)
          {
            setCategory(actualdata.CATEGORY);
          }
          // console.log(category);
          if(totalProductsData)
          {
            setEntireProducts(totalProductsData.PRODUCTS);
          }
          // console.log(entireProducts);
        }
        catch(error)
        {
          console.log("-----------");
          console.log(error);
        }
    }
    fun();
  },[choosedCategory,search,min_price,max_price,chct]);
  const showCategory=(event)=>
  {
    event.preventDefault();
    const initialChoosedCategory=document.getElementById("category");
    // console.log(initialchoosedCategory);
    const searchedText=document.getElementById("search-box");
    // console.log(searchedText);
    setChoosedCategory(()=>
    {
      return(initialChoosedCategory.value);
      // console.log(choosedCategory);
    }
    );
    setSearch(()=>
    {
      return(searchedText.value);
      // console.log(choosedCategory);
    }
    );
    dispatch(setUsers({chct:initialChoosedCategory.value,st:searchedText.value,reset:stateReset}));
    // navigating to ProductsShow page after clicking search
    navigate("/ProductsShow");
  }
  return(
        <>
         <header>
         <nav>
          {/* Brand icon */}
          <img src="/images/logo.png" alt="logo" className="brand-logo"/>
          <Link to="/">
          <div className="nav-links">
             {/* <i class="fa-solid fa-house fa-lg" style={{color:"#000000"}}></i> */}
             <div class="material-symbols-outlined home">home</div>
          </div>
          </Link>
          {/* Search bar*/}
          <div id="fp1">
          <form action="#">
          <select name="category" id="category">
          <option id="options" disabled selected hidden>CATEGORY</option>
          {category?.map((value,index)=>
          {
            return(
              <>
              <option id="options" key={index} value={value.category}>{value.category}</option>
              </>
             );
          })}
          </select>
          <input id="search-box" type="text" placeholder="search the product"/>
          <input type="submit" value="🔎" id="search-button" onClick={showCategory} />
          </form>
          </div> 
            <Link to="/Cart">
            <div className="nav-links">
              {/* <i class="fa-solid fa-cart-shopping fa-lg" style={{color: "#000000"}}></i> */}
              <div class="material-symbols-outlined">shopping_cart</div>
              <div className="nav-link-text">CART</div>
            </div></Link>
            <Link to="/Orders">
            <div className="nav-links">
            {/* <i class="fa-solid fa-truck fa-lg" style={{color: "#000000"}}></i> */}
            <div class="material-symbols-outlined">local_shipping</div>
              <div className="nav-link-text">ORDERS</div>
            </div>
            </Link>
            <Link to="/Login">
            <div className="nav-links">
              {/* <i class="fa-solid fa-circle-user fa-lg" style={{color: "#000000"}}></i> */}
              <div class="material-symbols-outlined">account_circle</div>
              {username?
                <div className="nav-link-text">{username}</div>
              :
              <div className="nav-link-text">LOGIN</div>
              }
              </div>
            </Link>
            {/* <li onClick={change}>Products</li> */}
         </nav>
         </header>
        {/* {console.log(category)}
        {console.log(choosedCategory)}
        {console.log(search)}
        {console.log(entireProducts)}
        {min_price[0]}
        {console.log(min_price)}
        {console.log(max_price)} */}
        {/* {console.log("pjojojoj")} */}
        {/* {console.log(chct)}
        {console.log(st)} */}
        {console.log(userName)}
        </>
    );
}
export default Header;
