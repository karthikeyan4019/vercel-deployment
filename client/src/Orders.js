import React, { useEffect, useState } from "react";
import{ToastContainer,toast}from "react-toastify";
import{useSelector}from "react-redux";
import{useNavigate}from"react-router-dom";
// css file
import"./Orders.css";

const Orders=()=>
{
    let[orderedItems,setOrderedItems]=useState([]);
    // redux value
    let userName=useSelector((state)=>
    {
        return(state.loginInfo.login[0].username);
    });
    let navigate=useNavigate();
    // api call to get user's ordered items
    const getOrderedItems=async()=>
    {
        try
        {
          let orderedItemsInfo=await fetch(`https://kuvizz-app-server.onrender.com/api/v1/order/getOrderedItems?userName=${userName}`);
          let orderedItemsData=await orderedItemsInfo.json();
          if(orderedItemsData)
          {
            setOrderedItems(orderedItemsData.orderedItemsInfo);
          }
        }
        catch(error)
        {
            console.log(error.message);
        }
    }
    useEffect(()=>
    {
      getOrderedItems();
    },[]);
    const loginNav=()=>
    {
      navigate("/Login");
    }
    const homeNav=()=>
    {
      navigate("/");
    }
    return(
        <>
        {/* <h1>Cart</h1>*/}
        {userName?
        orderedItems.length===0?
          <>
            <img src="/images/orders/empty_order.png" alt="empty-cart-image" className="empty-cart-image"/>
            <h3 className="empty-cart-title">There is no orders till now☹️</h3>
            <button className="continue-shopping-btn" onClick={homeNav}>CONTINUE SHOPPING</button>
          </>
          :
          <>
           <div className="orders-parent">
           {orderedItems.map((value)=>
            {
              return(
                <>
                  <div className="orders">
                    <div className="order-id-date-section">
                      <span className="order-id">Order-ID {value._id}</span>
                      <span className="order-date">Ordered On {value.createdAt}</span>
                    </div>
                    <div className="ordered-items-section">
                      {value.orderedItems.map((value2)=>
                      {
                        return(
                          <>
                            <div className="ordered-items-info-section">
                              <img src={value2.imagePath} alt={value2.productName} className="ordered-product-img"/>
                              <span className="ordered-product-name">
                                <p>{value2.productName}</p>
                              </span>
                              <span className="ordered-product-details">
                                <p>{value2.productDetails}</p>
                              </span>
                              <span className="ordered-product-price">
                                <p>₹{value2.price}</p>
                              </span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="ordred-item-delivery-info-section">
                      <span className="delivery-status-section">
                        <h5>Order Status : <span className="order-status">Order Confirmed</span></h5>
                      </span>
                      <span className="delivery-expected-date-section">
                        <h5>Expected Delivery On : <span className="order-delivery-expected-date">
                          20th November
                          </span></h5>
                      </span>
                    </div>
                    <div className="ordered-items-count-price-section">
                      <span className="ordered-items-count-section">
                        <h5>Total Product : {value.totalProduct}</h5>
                      </span>
                      <span className="ordered-items-price-section">
                        <h5>Total Amount : {value.totalAmount}</h5>
                      </span>
                    </div>
                    {console.log("-------------")}
                    {console.log(value)}
                  </div>
                </>
              );
            })}
           </div>
          </>
        :
          <>
            <h3 className="login-cart">Please login to see your orders😊</h3>
            <img src="/images/cart/login.png" alt="login-image" className="login-image"/>
            <div>
            <button className="login-cart-btn" onClick={loginNav}>LOGIN</button>
            </div>
          </>
        }
        {console.log(orderedItems)}
        {console.log("bhubggb")}
        </>
    );
}
export default Orders;

