const express=require("express");
const app=express();

const dotenv=require("dotenv");
const path=require("path");
dotenv.config({path:path.join(__dirname,"config","config.env")});

const https=require('http');
const cors=require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connectDatabase=require("./config/connectDatabase");

// const corsOption={
//     origin:"*"    
// }

app.use(cors({
    origin: ['https://kuvizz-app-client.vercel.app', 'https://kuvizz-app-client-7yvn981ac-karthikeyan-ks-projects-964659e9.vercel.app'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }));
// app.use(cors(corsOption));
// const corsOption = {
//     origin: process.env.CLIENT_URL || "*",  // Use CLIENT_URL from env
//     credentials: true,  // Allows cookies (if needed)
// };

// app.use(cors(corsOption));

// change the PORT PORT PORT-----------------------------------------

// routes
const signup=require("./routes/signup");
const login=require("./routes/login");
const product=require("./routes/product");
const category=require("./routes/category");
const cart=require("./routes/cart");
const address=require("./routes/userAddress");
const order=require("./routes/order");

connectDatabase();

app.use("/api/v1",signup);
app.use("/api/v1",login);
app.use("/api/v1",product);
app.use("/api/v1",order);
app.use("/api/v1",category);
app.use("/api/v1",cart);
app.use("/api/v1",address);

// https.createServer((req,res)=>{
// console.log("success")
// res.writeHead(200);
// res.end('hello world\n');
// },app).listen(8000);

app.listen(process.env.PORT,()=>
{
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`);
}); 