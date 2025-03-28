import React, { useEffect, useState } from "react";
import{ToastContainer,toast}from "react-toastify";
import{useSelector}from "react-redux";
import{useNavigate}from"react-router-dom";
// css file
import "./Cart.css";
const Cart=()=>
{
    let[cartItems,setCartItems]=useState([]);
    let[updatedItem,setUpdatedItem]=useState([]);
    let[deletedItem,setDeletedItem]=useState([]);
    let[totalProduct,setTotalProduct]=useState(0);
    let[totalAmount,setTotalAmount]=useState(0);
    let[userAddress,setUserAddress]=useState("");
    // let userAddress1=userAddress[0];
    // redux value
    let userName=useSelector((state)=>
    {
        return(state.loginInfo.login[0].username);
    });
    let navigate=useNavigate();
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
    // api call to get user's delivery address
    const getUserAddress=async()=>
    {
      try
      {
        let userAddressInfo=await fetch(`http://localhost:8000/api/v1/address/getUserAddress?userName=${userName}`);
        let userAddressData=await userAddressInfo.json();
        if(userAddressData)
        {
          setUserAddress(userAddressData.userAddress[0]);
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }
    useEffect(()=>
    {
      getCartItems();
      getUserAddress();
    },[userName,updatedItem,deletedItem]);
    useEffect(()=>
    {
      setTotalProduct(0);
      setTotalAmount(0);
      cartItems?.forEach((value)=>
      {
        setTotalProduct((curr)=>
        {
          return(curr+1);
        });
        setTotalAmount((curr)=>
        {
          return(curr+value.itemCount*value.price);
        });
      });
    },[cartItems]);
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
    const loginNav=()=>
    {
      navigate("/Login");
    }
    const homeNav=()=>
    {
      navigate("/");
    }
    const userAddressNav=()=>
    {
      if(userAddress)
      {
        navigate(`/Payment/?total_product=${totalProduct}&&total_amount=${totalAmount}`,{state:{userAddress}});
      }
      else
      {
        navigate(`/UserAddress/?total_product=${totalProduct}&&total_amount=${totalAmount}`);
      }
      // navigate(`/UserAddress/${totalProduct}/${totalAmount}`);
    }
    // const paymentNav=()=>
    // {
    //   navigate("/Payment");
    // }
    // class Object{
    //   constructor(name,value)
    //   {
    //     this.name=name;
    //     this.value=value;
    //   }
    // }
    // let car=new Object("Audi",120);
    // console.log(car);
    
    return(
        <>
        {/* <h1>Cart</h1>*/}
        {userName?
        cartItems.length===0?
          <>
            <img src="/images/cart/empty_cart.png" alt="empty-cart-image" className="empty-cart-image"/>
            <h3 className="empty-cart-title">Your cart is empty now ☹️</h3>
            <button className="continue-shopping-btn" onClick={homeNav}>CONTINUE SHOPPING</button>
          </>
          :
          <>
          <h1 className="cart-title">YOUR'S CART🛒</h1>
          {cartItems?.map((value)=>
            {
               return(
                <>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                          <img src={value.imagePath} alt={value.productName} className="productImage"/>
                        </div>
                        <div className="col-4">
                          <h3 className="productDetails">{value.productName}</h3>
                          <h6 className="productDetails">{value.productDetails}</h6>
                        </div>
                        <div className="col-4">
                          <h2><span class="material-symbols-outlined currency-rupee">currency_rupee</span>{value.price}</h2>
                          <button className="item-inc-dec-btn"><span className="dec-btn" onClick={()=>{itemCountDec(value.productName,value.itemCount)}}>-</span><span className="item-count-text">{value.itemCount}</span><span  className="inc-btn" onClick={()=>{itemCountInc(value.productName,value.itemCount)}}>+</span></button>
                        </div>
                    </div>
                </div>
                <hr/>
                </>
               );
            })}
            <div className="container totol-amount-cont">
              <div className="row">
                <div className="col-6">
                  <h3 className="total-amount-text">Total Amount</h3>
                </div>
                <div className="col-6">
                  <h3 className="total-amount"><span class="material-symbols-outlined currency-rupee-total-amount">currency_rupee</span>{totalAmount}</h3>
                </div>
              </div>
            </div>
            <button className="proceed-to-buy-btn" onClick={userAddressNav}>PROCEED TO BUY</button>
          </>
        :
          <>
            <h3 className="login-cart">Please login to see your cart😊</h3>
            <img src="/images/cart/login.png" alt="login-image" className="login-image"/>
            <div>
            <button className="login-cart-btn" onClick={loginNav}>LOGIN</button>
            </div>
          </>
        }
        {/* {console.log(userName)} */}
        {/* {console.log(cartItems)} */}
        {/* {console.log(userAddress)} */}
        {/* {console.log(totalAmount)} */}
        {/* {console.log(totalProduct)}
        {console.log(totalAmount)} */}
        {/* {console.log(typeof(totalAmount))} */}
        </>
    );
}
export default Cart;