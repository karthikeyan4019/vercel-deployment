import React from 'react';
import { Link,Outlet,useNavigate} from "react-router-dom";
import { useEffect, useState} from "react";
// redux
import {useSelector} from "react-redux";
// css
import"./Layout.css";

const Layout=()=>
{
  let navigate=useNavigate();
  let[category,setCategory]=useState([]);
  let[choosedCategory,setChoosedCategory]=useState("ALL");
  let[search,setSearch]=useState("");
  // redux value
  let username=useSelector((state)=>
  {
    return(state.loginInfo.login[0].username);
  });
  const getCategory=async()=>
  {
    try
    {
      let responsemetadata=await fetch("https://kuvizz-app-server.onrender.com/api/v1/category"); 
      let actualdata=await responsemetadata.json();
      // console.log(actualdata);
      if(actualdata)
      {
        setCategory(actualdata.CATEGORY);
      }
      // console.log(category);
    }
    catch(error)
    {
      console.log("-----------");
      console.log(error);
    }
  }
  useEffect(()=>
  {
    getCategory();
  },[]);
  const showCategory=(event)=>
  {
    event.preventDefault();
    // navigating to ProductsShow page after clicking search
    navigate(`/ProductsShow/${choosedCategory}/?search=${search}`);
  }
  const userAccountNav=()=>
  {
    if(username)
    {
      navigate("/UserAccount");
    }
    else
    {
      navigate("/Login");
    }
  }
  return(
    <>
    {/* header */}
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
          <select name="category" id="category" onChange={(event)=>{setChoosedCategory(event.target.value)}}>
          <option id="options"value="ALL">ALL</option>
          {category?.map((value,index)=>
          {
            return(
              <>
              <option id="options" key={index} value={value.category}>{value.category}</option>
              </>
             );
          })}
          </select>
          <input id="search-box" type="search" placeholder="search the product" onChange={(event)=>{setSearch(event.target.value)}}/>
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
            {/* <Link to="/Login"> */}
            <div className="nav-links user-account-nav-link" onClick={userAccountNav}>
              {/* <i class="fa-solid fa-circle-user fa-lg" style={{color: "#000000"}}></i> */}
              <div class="material-symbols-outlined">account_circle</div>
              {username?
                <div className="nav-link-text">{username}</div>
              :
              <div className="nav-link-text">LOGIN</div>
              }
              </div>
            {/* </Link> */}
            {/* <li onClick={change}>Products</li> */}
        </nav>
      </header>
      <Outlet/>
      {/* footer */}
      <footer>
        <div className="footer">
          <div className="footer-row-1">
                <div className="footer-column-1 footer-item">
                    <h3>OUR OWN PRODUCTS</h3>
                    <p>KUVIZZ Electronics</p>
                    <p>KUVIZZ Cloths</p>
                    <p>KUVIZZ Furnitures</p>
                </div>
                <div className="footer-column-2 footer-item">
                <h3>SHOPPING CATEGORIES</h3>
                    <p>Electronics</p>
                    <p>Furnitures</p>
                    <p>Cloths</p>
                    <p>Grocery</p>
                    <p>And many more...</p>
                </div>
                <div className="footer-column-3 footer-item">
                    <h3>OFFLINE BRANCHES IN INDIA</h3>
                    <p>Chennai</p>
                    <p>Mumbai</p>
                    <p>Bengaluru</p>
                    <p>Hyderabad</p>
                    <p>Jammu & Kashmir</p>
                    <p>Delhi</p>
                    <p>Kolkata</p>
                </div>
                <div className="footer-column-4 footer-item">
                    <h3>CONNECT WITH US</h3>
                    <p><i class="fa-brands fa-facebook fa-lg social-media-icon" style={{color: "#ffffff"}}></i>Facebook</p>
                    <p><i class="fa-brands fa-instagram fa-lg social-media-icon" style={{color: "#ffffff"}}></i>Instagram</p>
                    <p><i class="fa-brands fa-youtube fa-lg social-media-icon" style={{color: "#ffffff"}}></i>Youtube</p>
                </div>
                </div>
                <div className="footer-row-2">
                    <div className="brand country-flags">
                        <img src="/images/logo.png" alt="logo" className="brand-logo"/>
                        <img src="/images/india.png" alt="indian_flag" className="country_flag"/>
                        <img src="/images/australia.png" alt="australian_flag"className="country_flag"/>
                        <img src="/images/united-states.png" alt="usa_flag"className="country_flag"/>
                        <img src="/images/china.png" alt="china_flag"className="country_flag"/>
                        <img src="/images/germany.png" alt="germany_flag"className="country_flag"/>
                    </div>
                </div>
                <div className="footer-row-3">
                   <div class="material-symbols-outlined copyright-icon">copyright</div>
                   <div className="copyright-text">1990-2024 kuvizz.com</div>
                </div>
                <div className="footer-row-4">
                   <p>Designed and Developed By</p>
                   <p>KARTHIKEYAN K</p>
                   <p>Fullstack Developer</p>
                   <p>B.E computer science</p>
                   <i class="fa-brands fa-linkedin fa-lg personal-i-icon" style={{color:"#ffffff"}} ></i>
                   <span className="personal-i"><a href="https://www.linkedin.com/in/karthikeyank05/" target="_blank">karthikeyank05</a></span>
                   <i class="fa-solid fa-envelope fa-lg  personal-i-icon" style={{color: "#ffffff"}}></i>
                   <span className="personal-i">malarvizhi19772020@gmail.com</span>
                   <i class="fa-solid fa-phone-volume fa-lg  personal-i-icon" style={{color:"#ffffff"}}></i>
                   <span className="personal-i">6380242813</span>
                   <p className="institute-name">Trained By : <a href="https://www.fita.in/" target="_blank">FITA ACADEMY CHENNAI</a></p>
                </div>
          </div>
      </footer>
    </>
    );
}
export default Layout;