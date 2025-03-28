// import { useEffect, useState} from "react";
// import"bootstrap/dist/css/bootstrap.min.css";
// import"bootstrap/dist/js/bootstrap.bundle.min.js";
// // redux
// import{useSelector} from "react-redux";
// // css file
// import "./ProductsShow.css";
// import { useParams } from "react-router-dom";

// function ProductsShow()
// {
//   let{x,y}=useParams();
//   if(typeof(y)==="undefined")
//   {
//     y="";
//   }
//   let chct=useSelector((state)=>
//   {
//     return(state.userInfo.users[0].chct);
//   });
//   let st=useSelector((state)=>
//   {
//     return(state.userInfo.users[0].st);
//   });
//   let[choosedCategory,setChoosedCategory]=useState("");
//   let[search,setSearch]=useState("");
//   let[min_price,setMin_price]=useState("");
//   let[max_price,setMax_price]=useState("");
//   let[entireProducts,setEntireProducts]=useState([]);
//   useEffect(()=>{
//     async function fun()
//     {
//         try
//         {
//          let totalProducts=await fetch(`http://localhost:8000/api/v1/filter?category=${encodeURIComponent(choosedCategory)}&search=${encodeURIComponent(search)}&min_price=${encodeURIComponent(min_price)}&max_price=${encodeURIComponent(max_price)}`); 
//           let totalProductsData=await totalProducts.json();
//           // console.log(totalProductsData);
//           if(totalProductsData)
//           {
//             setEntireProducts(totalProductsData.PRODUCTS);
//           }
//           console.log(totalProductsData);
//         }
//         catch(error)
//         {
//           console.log("-----------");
//           console.log(error);
//         }
//     }
//     fun();
//     setChoosedCategory(()=>
//       {
//         return(chct);
//         // console.log(choosedCategory);
//       }
//       );
//       setSearch(()=>
//       {
//         return(st);
//         // console.log(choosedCategory);
//       }
//       );
// },[choosedCategory,search,min_price,max_price,chct,st]);
//   const showCategory=(event)=>
//   {
//     event.preventDefault();
//     const initialChoosedCategory=document.getElementById("category");
//     // console.log(initialchoosedCategory);
//     const searchedText=document.getElementById("search-box");
//     // console.log(searchedText);
//     setChoosedCategory(()=>
//     {
//       return(initialChoosedCategory.value);
//       // console.log(choosedCategory);
//     }
//     );
//     setSearch(()=>
//     {
//       return(searchedText.value);
//       // console.log(choosedCategory);
//     }
//     );
//   }
//   // showing filter options---------------------------------
//   const minvl=(event)=>
//   {
//     const minPriceValue=document.getElementById("min-price");
//     setMin_price(()=>
//       {
//         return(minPriceValue.value);
//       });
//   }
//   const maxvl=(event)=>
//   {
//       const maxPriceValue=document.getElementById("max-price");
//       setMax_price(()=>
//       {
//         return(maxPriceValue.value);
//       });
//   }
//   return(
//         <>
//         {/* Showing filter options ------------------------------------------------ */}
//         {(choosedCategory||search)?
//         <div className="filter-options-container" id="filter-options-container">
//         <form action="#">
//           <label htmlFor="min-price">MIN PRICE :</label>
//           <input id="min-price"type="text" onChange={minvl} />
//           <label htmlFor="max-price">MAX PRICE :</label>
//           <input id="max-price"type="text" onChange={maxvl}/>
//         </form>
//       </div>
//         :
//         console.log("NO NEED FOR FILTER OPTIONS")
//         }
//         {/* products card */}
//         <div id="card-parent">
//         {entireProducts.length>0?
//         entireProducts.map((value,index)=>
//          {
//            return(
//                 <>
//                   <div id="card">
//                     <p><b>PRODUCT NAME</b> : {value.productName}</p>
//                     <p><b>BRAND</b> : {value.brand}</p>
//                     <p><b>PRICE</b> : {value.price}</p>
//                     <p><b>ORIGIN</b> : {value.origin}</p>
//                     <p><b>SELLER</b> : {value.seller}</p>
//                     <p><b>STOCK</b> : {value.stock}</p>
//                   </div>
//                 </>
//               )
//           })
//          :
//          <div className="empty-product-message-container">
//           <h3 id="empty-products-message">😣THERE IS NO PRODUCTS RELATED TO YOUR SEARCH</h3>
//           {console.log(min_price,max_price)}
//          </div>
//         }
//         </div>
//         {/* <button className="btn btn-primary">BOOTSTRAP</button> */}
//         {/* {console.log(category)} */}
//         {/* {console.log(choosedCategory); */}
//         {/* {console.log(search)} */}
//         {/* {console.log(entireProducts)} */}
//         {/* {min_price[0]} */}
//         {/* {console.log(min_price)}
//         {console.log(max_price)} */}
//         {/* {console.log("-----------------")}
//         {console.log(entireProducts)}
//         {console.log(window.screen.width)}
//         {console.log(chct)}
//         {console.log(st)}
//         {console.log(choosedCategory)}
//         {console.log(search)} */}
//         {/* {console.log("oj9pjp9")} */}
//         {/* {console.log(entireProducts)}
//         {console.log(max_price)} */}
//         {console.log(x,y)}
//         </>
//       );
// }
// export default ProductsShow;
import { useEffect, useState} from "react";
import"bootstrap/dist/css/bootstrap.min.css";
import"bootstrap/dist/js/bootstrap.bundle.min.js";
// css file
import "./ProductsShow.css";
import { useParams } from "react-router-dom";

function ProductsShow()
{
  let{x,y}=useParams();
  if(typeof(y)==="undefined")
  {
    y="";
  }
  let[min_price,setMin_price]=useState("");
  let[max_price,setMax_price]=useState("");
  let[entireProducts,setEntireProducts]=useState([]);
  const getProducts=async()=>
  {
    try
    {
     let totalProducts=await fetch(`http://localhost:8000/api/v1/filter?category=${(x)}&search=${(y)}&min_price=${(min_price)}&max_price=${(max_price)}`); 
     let totalProductsData=await totalProducts.json();
     // console.log(totalProductsData);
     if(totalProductsData)
     {
      setEntireProducts(totalProductsData.PRODUCTS);
     }
     console.log(totalProductsData);
    }
    catch(error)
    {
      console.log("-----------");
      console.log(error);
    }
}
useEffect(()=>
{
  getProducts();
},[x,y,min_price,max_price]);
return(
    <>
    {/* Showing filter options ------------------------------------------------ */}
        {(x||y)&&
        <div className="filter-options-container" id="filter-options-container">
        <form action="#">
          <label htmlFor="min-price">MIN PRICE :</label>
          <input id="min-price"type="text" onChange={(event)=>{setMin_price(event.target.value)}} />
          <label htmlFor="max-price">MAX PRICE :</label>
          <input id="max-price"type="text" onChange={(event)=>{setMax_price(event.target.value)}}/>
        </form>
      </div>
    }
  {/* products card */}
        <div id="card-parent">
        {entireProducts.length>0?
        entireProducts.map((value,index)=>
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
        {console.log(x,y)}
        </>
      );
}
export default ProductsShow;