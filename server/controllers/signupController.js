const signupModel=require("../models/signupModel");
exports.signup=async(req,res,next)=>
{
  try
  {
    const{name,password}=req.body;
    let infoCheck=await signupModel.findOne(
      {
        name:req.body.name,
        // password:req.body.password
      }
    );
    // console.log(infoCheck);
    if(infoCheck===null)
    {
    //   const signupInfo=await signupModel.insertMany(
    //     [
    //       {
    //         name:req.body.name,
    //         password:req.body.password
    //       }
    //     ]
    //  );
    const signupInfo=new signupModel({name,password});
    await signupInfo.save();
    //  console.log(signupInfo);
    res.json(
      {
        STATUS:"SUCCESS",
        // MESSAGE:"REGISTERED SUCCESSFULLY"
      }
    );
    }
    else
    {
      res.json(
        {
          STATUS:"FAILURE",  
          MESSAGE:"This username was already taken.Please try to give the different username"
        }
      );
    }
   }
   catch(error)
   {
    res.json(
        {
            ERROR:error.message
        }
    );
   }
}
