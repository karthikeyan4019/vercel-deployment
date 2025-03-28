import { useEffect, useState} from "react";
import {Link,useNavigate, useParams} from "react-router-dom";
// react-redux
import { useDispatch,useSelector } from "react-redux";
import { setUsers } from "./slices/userSlice";
// css file
import "./home.css";
// bootstrap file
import"bootstrap/dist/css/bootstrap.min.css";
import"bootstrap/dist/js/bootstrap.bundle.min.js";

function Home()
{
  let navigate=useNavigate();
  let dispatch=useDispatch();
  let{username}=useParams();
  let[category,setCategory]=useState([]);
  useEffect(()=>{
    async function fun()
    {
      try
      {
        let responsemetadata=await fetch("http://localhost:8000/api/v1/category"); 
        let actualdata=await responsemetadata.json();
        // console.log(actualdata);
        if(actualdata)
        {
          setCategory(actualdata.CATEGORY);
        }
      }
      catch(error)
      {
      console.log("-----------");
        console.log(error);
      }
    }
  fun();
},[]);
const navig=(catvalue)=>
{
  dispatch(setUsers({specificProductsChCt:catvalue}));
  navigate("/SpecificProducts");
}
return(
        <>
        {/* <h1>HOME</h1> */}
        {/* carousel------------------------------------------------------ */}
        <div className="carousel-cont">
          <div id="carouselExampleDark" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
    <img src="./images/CI_1_1_1_1.png" alt="1"/>
      
      <div class="carousel-caption d-none d-md-block">
        <h5>FRUITS & VEGETABLES</h5>
        <p>Use the offers & discounts while buying the products and these offers & discounts are valid only on specified period</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
    <img src="./images/CI_2_2_2_2.png" alt="2"/>
      

      <div class="carousel-caption d-none d-md-block">
        <h5>Clothes</h5>
        <p>Use the offers & discounts while buying the products and these offers & discounts are valid only on specified period</p>
      </div>
    </div>
    <div class="carousel-item">
    <img src="./images/CI_3_3_3_3.png" alt="3"/>
      
      <div class="carousel-caption d-none d-md-block">
        <h5>Electronics</h5>
        <p>Use the offers & discounts while buying the products and these offers & discounts are valid only on specified period</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
          </div>
        <div id="card-parent">
        {category?.map((value,index)=>
          {
            return(
               <>
                  {/* <div id="card" onClick={()=>{navig(value.category)}}> */}
                  <div id="card" onClick={()=>{navigate(`/SpecificProducts/${value.category}`)}}>
                   <p><b>{value.category}</b></p>
                  </div>
               </>
             )
         })}
        </div>
        {/* <button className="btn btn-primary">BOOTSTRAP</button> */}
        {/* {console.log(category)} */}
        {/* {console.log(choosedCategory); */}
        {/* {console.log(search)} */}
        {/* {console.log(entireProducts)} */}
        {/* {min_price[0]} */}
        {/* {console.log(min_price)}
        {console.log(max_price)} */}
        {/* {console.log("-----------------")}
        {console.log(entireProducts)}
        {console.log(window.screen.width)}
        {console.log(chct)}
        {console.log(st)}
        {console.log(choosedCategory)}
        {console.log(search)} */}
        {/* {console.log("oj9pjp9")} */}
        {/* {console.log(entireProducts)}
        {console.log(max_price)} */}
        </>
      );
}
export default Home;