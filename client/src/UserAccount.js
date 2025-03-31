import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,Link} from "react-router-dom";
import { add } from './slices/loginSlice';
// css file
import"./UserAccount.css";

const UserAccount=()=>
{
    let[userAddress,setUserAddress]=useState("");
    let[logout,setLogout]=useState(false);
    // redux value
    let userName=useSelector((state)=>
    {
        return(state.loginInfo.login[0].username);
    });
    let dispatch=useDispatch();
    let navigate=useNavigate();
    // api call to get user's delivery address
    const getUserAddress=async()=>
        {
          try
          {
            let userAddressInfo=await fetch(`https://kuvizz-app-server.onrender.com/api/v1/address/getUserAddress?userName=${userName}`);
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
            getUserAddress();
        },[userName]);
        const loginNav=()=>
        {
          navigate("/Login");
        }
        const logoutAccount=()=>
        {
           dispatch(add({username:""}));
           navigate("/");
        }
        const personalDataFormNav=()=>
        {
          navigate("/UserAddress");
        }
    return(
        <>
         {/* <h1>User Account</h1> */}
         {userName?
           <div className="user-account-parent">
               {/* <h1>user account</h1> */}
           <div className="user-account-child">
               <div className="container">
                   <div className="row">
                        {/* ----------------------- */}
                        {/* <div className="col-6">
                            <div className="user-profile-img-section">
                              <img src="/images/user-account/user-profile.png" alt="user-profile" className="user-profile-img"/>
                            </div>
                            <div className="user-details-section">
                              <div className="username-profile">
                                <h2>{userAddress?.userName}</h2>
                              </div>
                              <div className="user-specific-details-section">
                                <h5>Phone Number</h5>
                                <h6>{userAddress?.phoneNo}</h6>
                              </div>
                              <div className="user-specific-details-section">
                                <h5>Email</h5>
                                <h6>{userAddress?.email}</h6>
                              </div>
                              <div className="user-specific-details-section">
                                <h5>Delivery Address</h5>
                                <h6>{userAddress?.houseNo},{userAddress?.apartmentName}</h6> 
                                <h6>{userAddress?.blockName},{userAddress?.areaName},{userAddress?.cityName}-{userAddress?.pincode},{userAddress?.state},{userAddress?.country}
                                </h6>
                              </div>
                            </div>
                        </div> */}
                        {userAddress?
                          <div className="col-6">
                          <div className="user-profile-img-section">
                            <img src="/images/user-account/user-profile.png" alt="user-profile" className="user-profile-img"/>
                          </div>
                          <div className="user-details-section">
                            <div className="username-profile">
                              <h2>{userAddress?.userName}</h2>
                            </div>
                            <div className="user-specific-details-section">
                              <h5>Phone Number</h5>
                              <h6>{userAddress?.phoneNo}</h6>
                            </div>
                            <div className="user-specific-details-section">
                              <h5>Email</h5>
                              <h6>{userAddress?.email}</h6>
                            </div>
                            <div className="user-specific-details-section">
                              <h5>Delivery Address</h5>
                              <h6>{userAddress?.houseNo},{userAddress?.apartmentName}</h6> 
                              <h6>{userAddress?.blockName},{userAddress?.areaName},{userAddress?.cityName}-{userAddress?.pincode},{userAddress?.state},{userAddress?.country}
                              </h6>
                            </div>
                          </div>
                      </div>
                        :
                          <div className="col-6">
                            <div className="personal-data-section">
                             <img src="/images/user-account/personal_data.png" alt="user-shopping" className="user-shopping-profile-img personal_data"/>
                             <button className="btn btn-primary personal-data-form-btn" onClick={personalDataFormNav}>Update Your Profile</button>
                            </div>
                          </div>
                        }
                        {/* <div>
                            <button>Enter Your Personal Details</button>
                        </div> */}
                       {/* ------------------- */}
                       <div className="col-6">
                           <div className="user-pages-section">
                              <div className="user-shoping-profile">
                                <img src="/images/user-account/user-shopping-profile.png" alt="user-shopping" className="user-shopping-profile-img"/>
                              </div>
                              {/* <div>
                                <img src="/images/user-account/b-a.png" alt="user-shopping" className="user-shopping-profile-img"/>
                              </div> */}
                              <Link to="/Orders">
                                <div className="order-profile">
                                  {/* <div class="material-symbols-outlined double-arrow-symbol">keyboard_double_arrow_right</div> */}
                                  <h5>🚚 Your Orders</h5>
                                </div>
                              </Link>
                              {/* <Link to="/Orders">
                                <div className="order-profile">
                                  <div class="material-symbols-outlined double-arrow-symbol">keyboard_double_arrow_right</div>
                                  <h5>Gift Cards</h5>
                                </div>
                              </Link>
                              <Link to="/Orders">
                                <div className="order-profile">
                                  <div class="material-symbols-outlined double-arrow-symbol">keyboard_double_arrow_right</div>
                                  <h5>Coupens</h5>
                                </div>
                              </Link>
                                <Link to="/Orders">
                                <div className="order-profile">
                                  <div class="material-symbols-outlined double-arrow-symbol">keyboard_double_arrow_right</div>
                                  <h5>Notifications</h5>
                                </div>
                              </Link> */}
                            </div>
                       </div>
                   </div>
                   <div className="row">
                    <div className="col-12 log-out-btn-section">
                        <button className="btn btn-primary log-out-btn" onClick={logoutAccount}>Log Out</button>
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
        </>
    );
}
export default UserAccount;
