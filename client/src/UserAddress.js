import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserAddress.css";

const UserAddress = () => {
  const navigate = useNavigate();

  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [blockName, setBlockName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [cityName, setCityName] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  const userName = useSelector(
    (state) => state.loginInfo.login[0]?.username
  );

  const [searchParams] = useSearchParams();
  const totalProduct = searchParams.get("total_product");
  const totalAmount = searchParams.get("total_amount");

  const userAddress = {
    userName,
    phoneNo,
    email,
    houseNo,
    apartmentName,
    blockName,
    areaName,
    cityName,
    pincode,
    state,
    country,
  };

  const saveUserAddress = async () => {
    try {
      await fetch(
        "https://kuvizz-app-server.onrender.com/api/v1/address/userAddress",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userAddress),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addressFormSubmit = async (event) => {
    event.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Please enter a valid 10 digit phone number", {
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    if (saveAddress) {
      await saveUserAddress();
    }

    if (totalProduct && totalAmount) {
      navigate(
        `/Payment?total_product=${totalProduct}&total_amount=${totalAmount}`,
        { state: { userAddress } }
      );
    } else {
      navigate("/UserAccount");
    }
  };

  const loginNav = () => navigate("/Login");

  return (
    <>
      {userName ? (
        <div className="address-parent">
          <div className="address-child">
            <form onSubmit={addressFormSubmit}>
              <h4>🚚 DELIVERY ADDRESS</h4>

              <input required placeholder="Phone No" onChange={(e) => setPhoneNo(e.target.value)} />
              <input required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              <input required placeholder="House No" onChange={(e) => setHouseNo(e.target.value)} />
              <input placeholder="Apartment Name" onChange={(e) => setApartmentName(e.target.value)} />
              <input required placeholder="Block Name" onChange={(e) => setBlockName(e.target.value)} />
              <input required placeholder="Area Name" onChange={(e) => setAreaName(e.target.value)} />
              <input required placeholder="City Name" onChange={(e) => setCityName(e.target.value)} />
              <input required placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} />

              <select required defaultValue="" onChange={(e) => setState(e.target.value)}>
                <option value="" disabled>Select State</option>
                <option value="Tamilnadu">Tamilnadu</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Kolkata">Kolkata</option>
              </select>

              <select required defaultValue="" onChange={(e) => setCountry(e.target.value)}>
                <option value="" disabled>Select Country</option>
                <option value="India">India</option>
              </select>

              {totalProduct && totalAmount && (
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => setSaveAddress(e.target.checked)}
                  />
                  Save Address
                </label>
              )}

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <h3>Please login 😊</h3>
          <img src="/images/cart/login.png" alt="login" />
          <button onClick={loginNav}>LOGIN</button>
        </>
      )}
    </>
  );
};

export default UserAddress;
