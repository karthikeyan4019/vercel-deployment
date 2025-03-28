import React, { useEffect, useState } from 'react';
//redux
import {useSelector } from "react-redux";
import"./ProductsShow.css";
const SpecificProducts=()=>
{
    let specificProductsChCt=useSelector((state)=>
    {
        return(state.userInfo.users[0].specificProductsChCt);
    });
    const[min_price,setMin_price]=useState("");
    const[max_price,setMax_price]=useState("");
    const[products,setProducts]=useState([]);
    const productsDataFun=async()=>
    {
     try
     {
        let productsDataRaw=await fetch(`http://localhost:8000/api/v1/filter?category=${specificProductsChCt}&min_price=${encodeURIComponent(min_price)}&max_price=${encodeURIComponent(max_price)}`);
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
          <input id="min-price"type="text" onChange={minvl} />
          <label htmlFor="max-price">MAX PRICE :</label>
          <input id="max-price"type="text" onChange={maxvl}/>
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
                    <p><b>PRODUCT NAME</b> : {value.productName}</p>
                    <p><b>BRAND</b> : {value.brand}</p>
                    <p><b>PRICE</b> : {value.price}</p>
                    <p><b>ORIGIN</b> : {value.origin}</p>
                    <p><b>SELLER</b> : {value.seller}</p>
                    <p><b>STOCK</b> : {value.stock}</p>
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
        </>
    );
}
export default SpecificProducts;
