import{useState}from"react";
import{toast}from"react-toastify";
import{useNavigate, useParams, useSearchParams}from "react-router-dom";
import {useSelector} from "react-redux";
// css file
import "./UserAddress.css";

const Useraddress=()=>
{
  let navigate=useNavigate();
  let[phoneNo,setPhoneNo]=useState("");
  let[email,setEmail]=useState("");
  let[houseNo,setHouseNo]=useState("");
  let[apartmentName,setApartmentName]=useState("");
  let[blockName,setBlockName]=useState("");
  let[areaName,setAreaName]=useState("");
  let[cityName,setCityName]=useState("");
  let[pincode,setPincode]=useState("");
  let[state,setState]=useState("");
  let[country,setCountry]=useState("");
  let[saveAddress,setSaveAddress]=useState("");
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
  let userAddress={
    userName:userName,
    phoneNo:phoneNo,
    email:email,
    houseNo:houseNo,
    apartmentName:apartmentName,
    blockName:blockName,
    areaName:areaName,
    cityName:cityName,
    pincode:pincode,
    state:state,
    country:country,
  };
  // let[userAddress,setUserAddress]=useState(
  //   {
  //     userName:userName,
  //     phoneNo:phoneNo,
  //     email:email,
  //     houseNo:houseNo,
  //     apartmentName:apartmentName,
  //     blockName:blockName,
  //     areaName:areaName,
  //     cityName:cityName,
  //     pincode:pincode,
  //     state:state,
  //     country:country
  //   }
  // );
  const saveUserAddress=async()=>
  {
    try
    {
      let addressInfo=await fetch("https://kuvizz-app-server.onrender.com/api/v1/address/userAddress",
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userAddress)
      }
      );
      // let addressData=await addressInfo.json();
    }
    catch(error)
    {
      console.log(error);
    }
  }
  const saveAddressSet=(event)=>
    {
      if(event.target.checked)
      {
        setSaveAddress(true);
      }
      else
      {
        setSaveAddress(false);
      }
    }
  const addressFormSubmit=async(event)=>
  {
    event.preventDefault();
    if(!(phoneNo.length===10))
    {
      toast.error("Please enter your 10 digit phone number",
      {
        autoClose:3000,
        theme:"dark"
      }
      );
    }
    else
    {
      if(saveAddress===true&&totalProduct&&totalAmount)
      {
        await saveUserAddress();
        navigate(`/Payment/?total_product=${totalProduct}&&total_amount=${totalAmount}`,{state:{userAddress}});
        // console.log(userAddress);
        // // console.log("save user address and navigate to payment page");
      }
      else if(totalProduct&&totalAmount)
      {
        navigate(`/Payment/?total_product=${totalProduct}&&total_amount=${totalAmount}`,{state:{userAddress}});
        // console.log(userAddress);
        // console.log("navigate to payment page with user address");
      }
      else
      {
        await saveUserAddress();
        navigate("/UserAccount");
      }
      // navigate("/Payment");
    }
  }
  const loginNav=()=>
  {
    navigate("/Login");
  }
  return(
        <>
        {/* <h1>Address</h1> */}
        {userName?
        <div className="address-parent">
            <div className="address-child">
                <form action="#" onSubmit={addressFormSubmit}>
                    <div className="form-title">
                      <h6>DELIVERY ADDRESS</h6>
                      <h4>🚚</h4>  
                      {/* <span class="material-symbols-outlined">local_shipping</span>   */}
                    </div>
                    <span className="specific-field">
                      <label htmlFor="phoneNO" className="fieldName">Phone NO</label>
                      <input type="text" id="phoneNo" className="fieldInput" required onChange={(event)=>{setPhoneNo(event.target.value)}}/>
                    </span>
                    <span className="specific-field">
                      <label htmlFor="email" className="fieldName">Email</label>
                      <input type="email" id="email" className="fieldInput" required onChange={(event)=>{setEmail(event.target.value)}}/>
                    </span>
                    <span className="specific-field">
                      <label htmlFor="houseNo" className="fieldName">House No</label>
                      <input type="text" id="houseNo" className="fieldInput" required onChange={(event)=>{setHouseNo(event.target.value)}}/>
                    </span>
                    <span className="specific-field">
                      <label htmlFor="apartmentName" className="fieldName">Apartment Name</label>
                      <input type="text" id="apartmentName" className="fieldInput" onChange={(event)=>{setApartmentName(event.target.value)}}/>
                    </span>
                    <span className="specific-field">
                      <label htmlFor="blockName" className="fieldName">Block Name</label>
                      <input type="text" id="blockName" className="fieldInput" required onChange={(event)=>{setBlockName(event.target.value)}}/>
                    </span>
                    <span className="specific-field">
                      <label htmlFor="areaName" className="fieldName">Area Name</label>
                      <input type="text" id="areaName" className="fieldInput" required onChange={(event)=>{setAreaName(event.target.value)}}/>
                    </span>
                    <span className="specific-field">
                      <label htmlFor="cityName" className="fieldName">City Name</label>
                      <input type="text" id="cityName" className="fieldInput" required onChange={(event)=>{setCityName(event.target.value)}}/>
                    </span>
                    <span className="specific-field">
                      <label htmlFor="pincode" className="fieldName">Pincode</label>
                      <input type="text" id="pincode" className="fieldInput" required onChange={(event)=>{setPincode(event.target.value)}}/>
                    </span>
                    <div className="state-field">
                      <label htmlFor="state" className="fieldName">State</label>
                      <select name="state" id="state" className="state-input" required onChange={(event)=>{setState(event.target.value)}}>
                        <option selected disabled hidden>select your state</option>
                        <option value="Tamilnadu">Tamilnadu</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Kolkata">Kolkata</option>
                      </select>
                      {/* <input list="states" id="state" className="state-input" required/>
                      <datalist id="states">
                        <option value="Chennai"/>
                        <option value="Mumbai"/>/
                        <option value="Bengaluru"/>
                        <option value="New Delhi"/>
                        <option value="Kolkata"/>
                      </datalist> */}
                    </div>
                    <div className="country-field">
                      <label htmlFor="country" className="fieldName">Country</label>
                      <select name="country" id="country" className="country-input" required onChange={(event)=>{setCountry(event.target.value)}}>
                        <option disabled selected hidden>select your country</option>
                        <option value="India">India</option>
                      </select>
                      {/* <input type="sel" id="country" className="country-input" required/> */}
                      {/* <input list="countries" id="country" className="country-input" required/> */}
                      {/* <datalist id="countries">
                        <option value="India"/>
                        <option value="Australia"/>/
                        <option value="USA"/>
                        <option value="China"/>
                        <option value="Germany"/>
                      </datalist> */}
                    </div>
                    {/* <div className="save-address-section">
                      <span className="save-address-specific-section">
                        <input type="checkbox" value="true" id="save-address" className="save-address-input" onChange={(event)=>{setSaveAddress(event.target.value)}}/>
                        <input type="checkbox" value="true" id="save-address" className="save-address-input"
                        onClick={(event)=>{saveAddressSet(event)}}/>
                      </span>
                      <span className="save-address-specific-section">
                        <label htmlFor="save-address" className="save-address-field-name">Save Address</label>
                      </span>
                    </div> */}
                    {totalProduct&&totalAmount&&
                      <div className="save-address-section">
                      <span className="save-address-specific-section">
                        {/* <input type="checkbox" value="true" id="save-address" className="save-address-input" onChange={(event)=>{setSaveAddress(event.target.value)}}/> */}
                        <input type="checkbox" value="true" id="save-address" className="save-address-input"
                        onClick={(event)=>{saveAddressSet(event)}}/>
                      </span>
                      <span className="save-address-specific-section">
                        <label htmlFor="save-address" className="save-address-field-name">Save Address</label>
                      </span>
                    </div>
                    }
                    <div className="address-submit-btn-section">
                        <input type="submit" className="address-submit-btn"/>
                    </div>
                </form>
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
        {/* {console.log(phoneNo)}
        {console.log(email)}
        {console.log(houseNo)}
        {console.log(apartmentName)}
        {console.log(blockName)}
        {console.log(areaName)}
        {console.log(cityName)}
        {console.log(pincode)}
        {console.log(state)}
        {console.log(country)}
        {console.log(saveAddress)} */}
        {/* {console.log(userAddress)} */}
        {/* {console.log(saveAddress)} */}
        {console.log(totalProduct)}
        {console.log(totalAmount)}
        </>
    );
}
export default Useraddress;