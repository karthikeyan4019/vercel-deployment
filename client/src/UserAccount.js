import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { add } from "./slices/loginSlice";
import "./UserAccount.css";

const UserAccount = () => {
  const [userAddress, setUserAddress] = useState(null);

  const userName = useSelector(
    (state) => state.loginInfo.login[0]?.username
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // api call
  const getUserAddress = useCallback(async () => {
    if (!userName) return;

    try {
      const res = await fetch(
        `https://kuvizz-app-server.onrender.com/api/v1/address/getUserAddress?userName=${userName}`
      );
      const data = await res.json();

      if (data?.userAddress?.length > 0) {
        setUserAddress(data.userAddress[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userName]);

  useEffect(() => {
    getUserAddress();
  }, [getUserAddress]);

  const loginNav = () => navigate("/Login");

  const logoutAccount = () => {
    dispatch(add({ username: "" }));
    navigate("/");
  };

  const personalDataFormNav = () => navigate("/UserAddress");

  return (
    <>
      {userName ? (
        <div className="user-account-parent">
          <div className="user-account-child">
            <div className="container">
              <div className="row">
                {userAddress ? (
                  <div className="col-6">
                    <div className="user-profile-img-section">
                      <img
                        src="/images/user-account/user-profile.png"
                        alt="user-profile"
                        className="user-profile-img"
                      />
                    </div>

                    <div className="user-details-section">
                      <h2>{userAddress.userName}</h2>

                      <h5>Phone Number</h5>
                      <h6>{userAddress.phoneNo}</h6>

                      <h5>Email</h5>
                      <h6>{userAddress.email}</h6>

                      <h5>Delivery Address</h5>
                      <h6>
                        {userAddress.houseNo}, {userAddress.apartmentName}
                      </h6>
                      <h6>
                        {userAddress.blockName}, {userAddress.areaName},{" "}
                        {userAddress.cityName}-{userAddress.pincode},{" "}
                        {userAddress.state}, {userAddress.country}
                      </h6>
                    </div>
                  </div>
                ) : (
                  <div className="col-6">
                    <div className="personal-data-section">
                      <img
                        src="/images/user-account/personal_data.png"
                        alt="personal-data"
                        className="user-shopping-profile-img personal_data"
                      />
                      <button
                        className="btn btn-primary"
                        onClick={personalDataFormNav}
                      >
                        Update Your Profile
                      </button>
                    </div>
                  </div>
                )}

                <div className="col-6">
                  <div className="user-pages-section">
                    <img
                      src="/images/user-account/user-shopping-profile.png"
                      alt="shopping"
                      className="user-shopping-profile-img"
                    />

                    <Link to="/Orders">
                      <h5>🚚 Your Orders</h5>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 log-out-btn-section">
                  <button
                    className="btn btn-primary"
                    onClick={logoutAccount}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3>Please login 😊</h3>
          <img
            src="/images/cart/login.png"
            alt="login"
            className="login-image"
          />
          <button onClick={loginNav}>LOGIN</button>
        </>
      )}
    </>
  );
};

export default UserAccount;
