import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//redux
import {useSelector } from "react-redux";
// css file
import"./ProductsShow.css";

const SpecificProducts=()=>
{
    let{x}=useParams();
    const[min_price,setMin_price]=useState("");
    const[max_price,setMax_price]=useState("");
    const[products,setProducts]=useState([]);
    const productsDataFun=async()=>
    {
     try
     {
        let productsDataRaw=await fetch(`http://localhost:8000/api/v1/filter?category=${x}&min_price=${encodeURIComponent(min_price)}&max_price=${encodeURIComponent(max_price)}`);
        let productsData=await productsDataRaw.json();
        // console.log(productsData);
        if(productsData)
        {
            setProducts(productsData.PRODUCTS);
        }
     }
     catch(error)
     {
        console.log(error);
     }
    }
    useEffect(()=>
    {
      productsDataFun();
    },[min_price,max_price]);
    // showing filter options---------------------------------
  const minvl=(event)=>
    {
      const minPriceValue=document.getElementById("min-price");
      setMin_price(()=>
        {
          return(minPriceValue.value);
        });
    }
    const maxvl=(event)=>
    {
        const maxPriceValue=document.getElementById("max-price");
        setMax_price(()=>
        {
          return(maxPriceValue.value);
        });
    }
    return(
        <>
         {/* Showing filter options ------------------------------------------------ */}
        <div className="filter-options-container" id="filter-options-container">
        <form action="#">
          <label htmlFor="min-price">MIN PRICE :</label>
          <input className="price-input" id="min-price"type="text" onChange={minvl} />
          <label htmlFor="max-price">MAX PRICE :</label>
          <input className="price-input" id="max-price"type="text" onChange={maxvl}/>
        </form>
        </div>
        {/* products card */}
        <div id="card-parent">
        {products.length>0?
        products.map((value,index)=>
         {
           return(
            <>
            <div id="card">
              <img className="card-img"src={value.imagePath} alt={value.productName} />
              <h4><b>{value.productName}</b></h4>
              <div className="product-details-section">
                <p><b>{value.productDetails}</b></p>
              </div>
             <div className="last-month-sale-section">
             <p className="last-month-sale"><b>{value.lastMonthSale}+ bought in last month</b></p>
             </div>
              <h2><span style={{color:"red"}}>-{value.discount}%</span> {value.price}</h2>
              <a className="store-link" href={value.brandWebsiteUrl} target="_blank">Visit {value.storeName} Store</a>
              <button className="cart-btn">ADD TO CART</button>
            </div>
          </>
              )
          })
         :
         <div className="empty-product-message-container">
          <h3 id="empty-products-message">😣THERE IS NO PRODUCTS RELATED TO YOUR SEARCH</h3>
          {console.log(min_price,max_price)}
         </div>
        }
        </div>
        {/* {console.log(fruits)} */}
        {console.log(x)}
        </>
    );
}
export default SpecificProducts;
