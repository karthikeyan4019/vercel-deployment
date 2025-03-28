// import React, { useEffect, useState } from 'react'
// // css file
// import"./Login.css";
// import { useNavigate } from 'react-router-dom';
// const Signup=()=>
// {
//     const[username,setUsername]=useState("");
//     const[password,setpassword]=useState("");
//     const[response,setResponse]=useState("");
//     const[keyVal,setKeyVal]=useState("");
//     const navigate=useNavigate();
//     const signupOperation=async()=>
//     {
//       try
//       {
//         const signup=await fetch("http://localhost:8000/api/v1/signup",
//         {
//             method:"PUT",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({"name":`${username}`,"password":`${password}`})
//         }
//         );
//         const signupData=await signup.json();
//         setResponse(()=>
//         {
//             return(signupData);
//         });
//         setKeyVal(()=>
//         {
//             return("YES");
//         });
//       }
//       catch(error)
//       {
//        console.log(error);
//       }
//     }
//     useEffect(()=>
//     {
//       signupOperation();
//     },[username,password,keyVal]);
//     const signupSubmit=async(event)=>
//     {
//         event.preventDefault();
//         let usernameElement=document.getElementById("username");
//         let passwordElement=document.getElementById("password");
//         setUsername(()=>
//         {
//             return(usernameElement.value);
//         });
//         setpassword(()=>
//         {
//             return(passwordElement.value);
//         });
//         setKeyVal(()=>
//         {
//             return("");
//         });
//     }
//     if(response.STATUS==="SUCCESS")
//     {
//         navigate("/Login");
//         // console.log(response);
//     }
//     return(
//         <>
//         <h1>Signup</h1>
//         {(username||password)&&keyVal&&response.STATUS=="FAILURE"?
//         <div className="error-message">
//          <h1>{response.MESSAGE}</h1>
//         </div>  
//         :
//         console.log("NO ERROR")
//         }
//         <div className="signup-form">
//         <form action="#">
//             <label htmlFor="username">Username :</label>
//             <input type="text" name="username" id="username"/>
//             <label htmlFor="password">Password :</label>
//             <input type="password" name="password" id="password" />
//             <input type="submit" onClick={signupSubmit} />
//         </form>
//         </div>
//         {/* {console.log(username)}
//         {console.log(password)}
//         {console.log(response)} */}
//         {console.log(response)}
//         </>
//     );
// }
// export default Signup;
import React, { useEffect, useState } from 'react'
// css file
import"./Login.css";
import { useNavigate } from 'react-router-dom';
const Signup=()=>
{
    const[username,setUsername]=useState("");
    const[password,setpassword]=useState("");
    const[response,setResponse]=useState("");
    const[keyVal,setKeyVal]=useState("");
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
        setKeyVal(()=>
        {
            return("YES");
        });
      }
      catch(error)
      {
       console.log(error);
      }
    }
    useEffect(()=>
    {
      signupOperation();
    },[username,password,keyVal]);
    const signupSubmit=async(event)=>
    {
        // event.preventDefault();
        // let usernameElement=document.getElementById("username");
        // let passwordElement=document.getElementById("password");
        // setUsername(()=>
        // {
        //     return(usernameElement.value);
        // });
        // setpassword(()=>
        // {
        //     return(passwordElement.value);
        // });
        // setKeyVal(()=>
        // {
        //     return("");
        // });
        
    }
    if(response.STATUS==="SUCCESS")
    {
        navigate("/Login");
        // console.log(response);
    }
    // const usernameSet=()=>
    // {
    //     setUsername(()=>
    //     {
    //         return();
    //     });
    // }
    return(
        <>
        <h1>Signup</h1>
        {(username||password)&&keyVal&&response.STATUS=="FAILURE"?
        <div className="error-message">
         <h1>{response.MESSAGE}</h1>
        </div>  
        :
        console.log("NO ERROR")
        }
        <div className="signup-form">
        <form action="#">
            <label htmlFor="username">Username :</label>
            <input type="text" name="username" id="username" onChange={()=>{setUsername(this.value)}}/>
            <label htmlFor="password">Password :</label>
            <input type="password" name="password" id="password" onChange={()=>{setpassword(this.value)}}/>
            <input type="submit" onClick={signupSubmit} />
        </form>
        </div>
        {/* {console.log(username)}
        {console.log(password)}
        {console.log(response)} */}
        {console.log(response)}
        </>
    );
}
export default Signup;
