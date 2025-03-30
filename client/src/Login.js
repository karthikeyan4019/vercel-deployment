import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// redux
import { useDispatch,useSelector } from "react-redux";
import { add } from './slices/loginSlice';
// css file
import"./Login.css";
// bootstrap file
import"bootstrap/dist/css/bootstrap.min.css";
import"bootstrap/dist/js/bootstrap.bundle.min.js";
const Login=()=>
{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[response,setResponse]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const loginOperation=async()=>
    {
      try
      {
        const login=await fetch("https://kuvizz-app-server.onrender.com/api/v1/login",
            {
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({"name":`${username}`,"password":`${password}`})
            }
        );
        const loginData=await login.json();
        setResponse(()=>
        {
            return(loginData);
        });
        if(loginData.STATUS==="SUCCESS")
        {
          dispatch(add({username:username}));
          navigate("/");
        }
      }
      catch(error)
      {
       console.log(error);
      }
    }
    const loginSubmit=async(event)=>
    {
        event.preventDefault();
        await loginOperation();
    }
    const signupNav=(event)=>
    {
      event.preventDefault();
      navigate("/signup");
    }
    return(
        <>
        <h1 className="login-title">Login</h1>
        {response.STATUS=="FAILURE"&&
        <div className="error-message">
         <h1>{response.MESSAGE}</h1>
        </div>  
        }
        <div className="login-form-parent">
        <form action="#" className="login-form">
            <div className="username-row form-row">
            <label htmlFor="username">Username :</label>
            <input type="text" name="username" id="username"  onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>
           <div className="password-row form-row">
             <label htmlFor="password">Password :</label>
             <input type="password" name="password" id="password"  onChange={(event)=>{setPassword(event.target.value)}}/>
           </div>
           <div className="btn-row">
             <input type="submit" value="SUBMIT" className="button" onClick={loginSubmit}/><br />
           <span>(or)</span>
           <button className="button" onClick={signupNav}>SIGN-UP</button>
           </div>
        </form>
        </div>
        {/* {console.log(username)}
        {console.log(password)}
        {console.log(response)} */}
        </>
    );
}
export default Login;
