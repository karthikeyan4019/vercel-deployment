import React, {useState} from 'react'
// css file
import"./Login.css";
import { useNavigate } from 'react-router-dom';
const Signup=()=>
{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[response,setResponse]=useState("");
    const navigate=useNavigate();
    const signupOperation=async()=>
    {
      try
      {
        const signup=await fetch("http://localhost:8000/api/v1/signup",
        {
          method:"PUT",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({"name":`${username}`,"password":`${password}`})
        }
        );
        const signupData=await signup.json();
        setResponse(()=>
        {
            return(signupData);
        });
        if(signupData.STATUS==="SUCCESS")
        {
            navigate("/Login");
        }
      }
      catch(error)
      {
       console.log(error);
      }
    }
    const signupSubmit=async(event)=>
    {
      event.preventDefault();
      await signupOperation();
    }
    return(
        <>
        <h1 className="signup-title">Signup</h1>
        {response.STATUS=="FAILURE"&&
        <div className="error-message">
         <h1>{response.MESSAGE}</h1>
        </div>  
        }
        <div className="signup-form-parent">
        <form action="#" className="signup-form">
            <div className="username-row form-row">
            <label htmlFor="username">Username :</label>
            <input type="text" name="username" id="username"  onChange={(event)=>{setUsername(event.target.value)}}/>
            </div>
           <div className="password-row form-row">
             <label htmlFor="password">Password :</label>
             <input type="password" name="password" id="password"  onChange={(event)=>{setPassword(event.target.value)}}/>
           </div>
           <div className="btn-row">
             <input type="submit" value="SUBMIT" className="button" onClick={signupSubmit}/><br />
           </div>
        </form>
        </div>
        {/* {console.log(username)}
        {console.log(password)}
        {console.log(response)} */}
        {/* {console.log(response)} */}
        </>
    );
}
export default Signup;
