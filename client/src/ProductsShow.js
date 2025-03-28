import { useEffect, useState} from "react";
import { useParams,useSearchParams,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
// toastify
import{toast}from"react-toastify";
// bootstrap files
import"bootstrap/dist/css/bootstrap.min.css";
import"bootstrap/dist/js/bootstrap.bundle.min.js";
// css file
import "./ProductsShow.css";

function ProductsShow()
{
  const navigate=useNavigate();
  let{x}=useParams();
  let[y]=useSearchParams();
  // console.log(x,y);
  // console.log(x,y.get("search"));
  let z=y.get("search");
  // console.log(z);
  // specifically for choosed category from home page
  if(z===null)
  {
    z="";
  }
  let[min_price,setMin_price]=useState("");
  let[max_price,setMax_price]=useState("");
  let[entireProducts,setEntireProducts]=useState([]);
  let[cartItems,setCartItems]=useState([]);
  let[insertedItem,setInsertedItem]=useState([]);
  let[updatedItem,setUpdatedItem]=useState([]);
  let[deletedItem,setDeletedItem]=useState([]);
  // redux value
  let userName=useSelector((state)=>
  {
    return(state.loginInfo.login[0].username);
  }
  );
  // api call to get products
  const getProducts=async()=>
  {
    try
    {
     let totalProducts=await fetch(`http://localhost:8000/api/v1/filter?category=${(x)}&search=${(z)}&min_price=${(min_price)}&max_price=${(max_price)}`); 
     let totalProductsData=await totalProducts.json();
    // console.log(totalProductsData);
    // setEntireProducts(totalProductsData.PRODUCTS);
    if(totalProductsData)
    {
      setEntireProducts(totalProductsData.PRODUCTS);
    //   setEntireProducts((curr)=>
    //   {
    //     console.log(curr);
        
    //     entireProducts=[...curr,totalProductsData.PRODUCTS];
    //     return(entireProducts);
    //   });
    }
    }
    catch(error)
    {
      console.log(error);
    }
}
// api call to get user's cart items
const getCartItems=async()=>
  {
    try
    {
       let cartItemsInfo=await fetch(`http://localhost:8000/api/v1/cart/getcartitems?userName=${userName}`);
       let cartItemsData=await cartItemsInfo.json();
       if(cartItemsData)
       {
        setCartItems(cartItemsData.items);
       }
    }
    catch(error)
    {
      console.log(error);
    }
  } 
// api call to insert items in cart
const insertItems=async(value)=>
{
  try
  {
    const itemInfo=await fetch("http://localhost:8000/api/v1/cart/insertitems",
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          "userName":userName,
          "category":value.category,
          "productName":value.productName,
          "productDetails":value.productDetails,
          "imagePath":value.imagePath,
          "storeName":value.storeName,
          "brandWebsiteUrl":value.brandWebsiteUrl,
          "lastMonthSale":value.lastMonthSale,
          "discount":value.discount,
          "price":value.price,
        })
      }
     );
     const itemData=await itemInfo.json();
    //  console.log(result);
     if(itemData)
     {
      setInsertedItem(itemData.result);
     }
  }
  catch(error)
  {
    console.log(error);
  }
}
// api call to update user's cart items
const updateCartItems=async(productName,itemCount)=>
{
  // console.log(userName,productName,itemCount);
  try
  {
    let updatedItemInfo=await fetch("http://localhost:8000/api/v1/cart/updateCartItems",
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({userName:userName,productName:productName,itemCount:itemCount})
    
    }
    );
    let updatedItemData=await updatedItemInfo.json();
    if(updatedItemData)
    {
      setUpdatedItem(updatedItemData.updatedCartItem);
    }
  }
  catch(error)
  {
    console.log(error);
  }
}
// api call to delete cart items
const deleteCartItems=async(productName)=>
{
  try
  {
    let deletedCartItemInfo=await fetch("http://localhost:8000/api/v1/cart/deleteCartItems",
      {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({userName:userName,productName:productName})
      }
    );
    let deletedCartItemData=await deletedCartItemInfo.json();
    if(deletedCartItemData)
    {
      setDeletedItem(deletedCartItemData.deletedCartItem);
    }
  }
  catch(error)
  {
    console.log(error);
  }
}
useEffect(()=>
{
  getProducts();
  getCartItems();
},[x,z,min_price,max_price,insertedItem,updatedItem,deletedItem]);
useEffect(()=>
{
  cartItems?.forEach((item1) => {
    setEntireProducts((currProducts) => {
      return currProducts.map((item2) => {
        if (item1.productName === item2.productName) {
          return {...item2, itemCount: item1.itemCount };
        }
          else
        {
          return(item2);
        }
        // return item2;
      });
    });
  });
},[cartItems,insertedItem,updatedItem,deletedItem]);
// adding items in cart
const addItems=async(value)=>
{
  if(userName)
  {
    await insertItems(value);
    toast.success("successfully added to cart 🛒",
    {
      autoClose:3000,
      theme:"dark"
    }
    );
  }
  else
  {
    navigate("/Login");
  }
}
// cart updation and deleteion
const itemCountDec=async(productName,itemCount)=>
{
  if(itemCount-1===0)
  {
    await deleteCartItems(productName);
  }
  else
  {
  await updateCartItems(productName,itemCount-1);
  }
}
const itemCountInc=async(productName,itemCount)=>
{
  await updateCartItems(productName,itemCount+1);
}
// cartItems?.forEach((item1)=>
//   {
//     entireProducts?.forEach((item2)=>
//     {
//       if(item1.productName===item2.productName)
//       {
//         // item2.itemCount=item1.itemCount;
//         setEntireProducts((curr)=>
//         {
//           return([...curr,item2.itemCount=item1.itemCount]);
//         });
//       }
//     });
//   });
// cartItems?.forEach((item1) => {
//   setEntireProducts((currProducts) => {
//     return("1");
    // return currProducts.map((item2) => {
    //   if (item1.productName === item2.productName) {
    //     return { ...item2, itemCount: item1.itemCount }; // Create a new object with updated count
    //   }
    //   else
    //   {
    //     return(item2);
    //   }
      // return item2; // Keep the object unchanged
    // });
//   });
// });
return(
    <>
    {/* Showing filter options ------------------------------------------------ */}
        {(x||y)&&
        <div className="filter-options-container" id="filter-options-container">
        <form action="#">
          <label className="min-price-label" htmlFor="min-price">MIN PRICE </label>
          <input className="price-input" id="min-price"type="text" onChange={(event)=>{setMin_price(event.target.value)}} />
          <label className="max-price-label" htmlFor="max-price">MAX PRICE  </label>
          <input className="price-input" id="max-price"type="text" onChange={(event)=>{setMax_price(event.target.value)}}/>
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
                    <img className="card-img"src={value.imagePath} alt={value.productName} />
                    <h4><b>{value.productName}</b></h4>
                    <div className="product-details-section">
                      <p><b>{value.productDetails}</b></p>
                    </div>
                    <div className="last-month-sale-section">
                    <p className="last-month-sale"><b>{value.lastMonthSale}+ bought in last month</b></p>
                    </div>
                    <h2><span style={{color:"red"}}>-{value.discount}%</span> {value.price}</h2>
                    <a className="store-link" href={value.brandWebsiteUrl} target="_blank">Visit{value.storeName} Store</a>
                    {/* <button className="cart-btn" onClick={()=>{addItems(value)}}>ADD TO CART</button> */}
                    {/* {value.itemCount? */}
                    {/* <button className="item-inc-dec-btn"><span className="dec-btn" onClick={()=>{itemCountDec(value.productName,value.itemCount)}}>-</span><span className="item-count-text">{value.itemCount}</span><span  className="inc-btn" onClick={()=>{itemCountInc(value.productName,value.itemCount)}}>+</span></button>
                    : */}
                    <button className="cart-btn" onClick={()=>{addItems(value)}}>ADD TO CART</button>
                    {/* } */}
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
        {/* {console.log(x,y)} */}
        {/* <img src="/images/laptops/apple-2.jpg" alt="asus_vivobook"/> */}
        {/* <img src="/images/laptops/apple-2.jpg" alt="asus_vivobook"/> */}
        {/* {console.log(cartItems)} */}
        {/* {console.log(insertedItem)} */}
        {/* {console.log(entireProducts,"1-entireProducts")}
        {console.log(cartItems,"2-cartItems")}
        {console.log(insertedItem,"3-(insertedItem")}
        {console.log(updatedItem,"4-updatedItem")} 
        {console.log(deletedItem,"5-deletedItem")} */}
        {/* {console.log(insertedItem)} */}
        {/* {console.log("UI")} */}
        </>
      );
}
export default ProductsShow;