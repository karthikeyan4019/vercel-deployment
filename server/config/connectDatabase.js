const mongoose=require("mongoose");
const connectDatabase=()=>
{
  mongoose.connect(process.env.DB_URL)
  .then((con)=>
{
    console.log("MongoDB was connected to the host",con.connection.host);
})
.catch(()=>
{
    console.error("Something an error");
});
;
  ;
}
module.exports=connectDatabase;