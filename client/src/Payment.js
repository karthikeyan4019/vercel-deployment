import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams,useSearchParams} from "react-router-dom";
// css file
import"./Payment.css";
// toastify
import{toast}from"react-toastify";
import { useState , useEffect} from "react";

const Payment=()=>
    {
      let[cartItems,setCartItems]=useState([]);
      // redux value
      let userName=useSelector((state)=>
      {
        return(state.loginInfo.login[0].username);
      });
      // let{totalProduct,totalAmount}=useParams();
      let [x]=useSearchParams();
      let totalProduct=x.get("total_product");
      let [y]=useSearchParams();
      let totalAmount=y.get("total_amount");
      let navigate=useNavigate();
      let location=useLocation();
      let userAddress=location.state?.userAddress;
      // api call to get user's cart items
      const getCartItems=async()=>
      {
        try
        {
          let cartItemsInfo=await fetch(`https://kuvizz-app-server.onrender.com/api/v1/cart/getcartitems?userName=${userName}`);
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
      // api call to insert ordered items 
      const insertOrderedItems=async()=>
      {
        try
        {
          const insertOrItems=await fetch("https://kuvizz-app-server.onrender.com/api/v1/order/createOrder",
          {
            method:"PUT",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(
            {
              userName:userName,
              orderedItems:cartItems,
              totalProduct:totalProduct,
              totalAmount:totalAmount
            }
            )
          }
          );
        }
        catch(error)
        {
          console.log(error.message);
          
        }
      }
      useEffect(()=>
      {
        getCartItems();
      },[]);
      const orderConfirm=async()=>
        {
          // await getCartItems();
          await insertOrderedItems();
          toast.success("Order Confirmed 😀",
            {
              autoClose:3000,
              theme:"dark"
            }
          );
          navigate("/orders");
        }
      const loginNav=()=>
      {
       navigate("/Login");
      }
      return(
            <>
            {userName?
            <div className="parent">
              <div className="child user-address-section">
                {/* <h3>USER DELIVERY ADDRESS</h3> */}
                <div className="section-title">
                  <h3>Delivering to {userAddress.userName}</h3>
                </div>
                <div className="section-address-content">
                 <h6>{userAddress.houseNo},{userAddress.apartmentName}</h6> 
                 <h6>{userAddress.blockName},{userAddress.areaName},{userAddress.cityName}-{userAddress.pincode},{userAddress.state},{userAddress.country}
                 </h6> 
                </div>
              </div>
              <div className="child order-summary-section">
                <div className="section-title">
                  <h3>Order Summary</h3>
                </div>
               <div className="section-order-summary-content">
                <h6>Total Products</h6>
                <h6>Total Price</h6>
                <h6>Delivery Charges</h6>
                <h6 className="payment-total-amount">Total Amount</h6>
               </div>
               <div className="section-order-summary-content">
                <h6 className="total-products-count">{totalProduct}</h6>
                <h6><span class="material-symbols-outlined payment-currency-rupee">currency_rupee</span>{totalAmount}</h6>
                <h6 className="free-delivery"><span class="material-symbols-outlined payment-currency-rupee">currency_rupee</span>Free Delivery</h6>
                <h6 className="payment-total-amount"><span class="material-symbols-outlined payment-currency-rupee">currency_rupee</span>{totalAmount}</h6>
               </div>
              </div>
              <div className="child child3">
                <div className="section-title">
                  <h3>Payment Methods</h3>
                </div>
                <div className="section-contents cod-section-contents">
                    <div className="cod-section-area">
                      <div className="cod-section-area-contents">
                        <div class="material-symbols-outlined cod-symbol">payments</div>
                        <h6 className="cod-title">Cash On Delivery</h6>
                        <div class="material-symbols-outlined cod-downward-symbol">stat_minus_1</div>
                      </div>
                      <div className="cod-order-confirm-btn-section">
                        <button className="btn btn-primary order-confirm-btn" onClick={orderConfirm}>Place Order</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            :
            <>
            <h3 className="login-cart">Please login😊</h3>
              <img src="/images/cart/login.png" alt="login-image" className="login-image"/>
              <div>
              <button className="login-cart-btn" onClick={loginNav}>LOGIN</button>
            </div>
            </>
            }
              {console.log(userAddress)}
              {console.log(totalProduct)}
              {console.log(totalAmount)}
              {console.log(cartItems)}
          </>
        );
    }
    export default Payment;