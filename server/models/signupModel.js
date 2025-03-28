const mongoose=require("mongoose");
const { string } = require("yup");
const bcrypt=require("bcrypt");
const signupSchema=new mongoose.Schema(
    {
        // name:{
        //     type:String,
        //     required:true,
        // },
        // password:{
        //     type:String,
        //     required:true,
        //     min:8,
        //     max:10
        // }
        name:String,
        password:String
    }
);
// Hash the password before saving the document
signupSchema.pre("save",async function(next)
{
//   console.log("----------");
//   console.log(this.password);
  if(this.isModified("password")||this.isNew)
  {
    const salt=await bcrypt.genSalt(10);
    // console.log(salt);
    this.password=await bcrypt.hash(this.password,salt);
    // console.log(this.password);
  }
  next();
});
// console.log("nibl");
// Compare the password when login
signupSchema.methods.comparePassword=async function(password)
{ 
  return(bcrypt.compare(password,this.password));
}
const signupModel=mongoose.model("signupData",signupSchema);
module.exports=signupModel;