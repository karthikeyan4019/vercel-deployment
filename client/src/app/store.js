import{configureStore} from "@reduxjs/toolkit";
import  userReducer  from "../slices/userSlice";
import loginReducer from "../slices/loginSlice";

let store=configureStore({
    reducer:{
        userInfo:userReducer,
        loginInfo:loginReducer
    }
});
export default store;