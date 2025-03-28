// const loginModel = require("../models/loginModel");
const signupModel=require("../models/signupModel");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const path=require("path");
const { log } = require("console");
dotenv.config({path:path.join(__dirname,"config","config.env")});

exports.loginAuth = async (req, res, next) => {
  try {
    console.log(req.body.name);
    const user = await signupModel.findOne({
      name:req.body.name
      // password: req.body.password,
    });
    console.log(user);
    // if (login === null) {
    //   res.status(404).json({
    //   message: "can't find",
    //   });
    if(!user||!(await user.comparePassword(req.body.password)))
    {
      res.status(401).json(
          {
            STATUS:"FAILURE",
            MESSAGE:"Username or Password invalid"
          }
        );
    } 
    else
    {
      // res.json({
      //   // login:login,
      //   message: "Yes,The user already registered",
      // });
    // Token generation
    const token=jwt.sign({id:user._id},"NEW",{expiresIn:"1h"});
    res.status(200).send(
    {
      STATUS:"SUCCESS",
      token:token,
      userName:req.body.name,
    }
  );
    console.log(process.env.token_key);
    console.log(token);
    }
  } 
  catch (error) {
    res.status(400).json({
      message:error.message
    });
  }
};
// exports.loginAuth = async (req, res, next) => {
  
//     console.log(req.body.name);
//     const login = await loginModel.findOne({
//       name: req.body.name,
//       password: req.body.password
//     })
//     .then(()=>
//     {
//       res.json({
//       // login:login,
//       message: "Yes,The user already registered"
//     })
//   ):
//   }

//     if (login === null) {
//       res.status(404).json({
//         message: "can't find",
//       });
//     } else {
//       res.json({
//         // login:login,
//         message: "Yes,The user already registered",
//       });
    
   
//     res.status(400).json({
//       message: "Username or password invalid",
//     });
//   }
// };
// exports.loginAuth=async (req,res,next)=>
// {
//   console.log(req.body.name,req.body.password);
  
//    const login=await loginModel.findOne(
//     {
//       name: req.body.name,
//       password: req.body.password
//     }
//    )
//    .then(()=>
//   {
//     res.json(
//       {
//         message: "Yes,The user already registered"
//       }
//     );
//   })
//   .catch(()=>
//   {
//     res.status(404).json(
//       {
//         message:"Cant't find"
//       }
//     );
//   });
// }