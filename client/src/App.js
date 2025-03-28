import{BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
// toastify
import{ToastContainer}from"react-toastify";
// bootstrap file
import 'bootstrap/dist/css/bootstrap.min.css';
// layout
import Layout from "./Layout";

import Home from "./Home";
import ProductsShow from "./ProductsShow";
import SpecificProducts from "./SpecificProducts";
import Useraddress from "./UserAddress";
import Payment from "./Payment";
import UserAccount from "./UserAccount";
// header
import Cart from "./Cart";
import Orders from "./Orders";
import Login from "./Login";
import Signup from "./Signup";
// footer
import Contact from "./Contact";
import Feedback from "./Feedback";
import OfflineBranches from "./OfflineBranches";
//error page
import Errorpage from "./Errorpage";

function App() {
  return (
    <>
    <BrowserRouter>
    {/* toast container */}
    <ToastContainer/>
    <Routes>
    <Route path="/" element={<Layout/>}>
          {/* Nested routes */}
          <Route index element={<Home/>} />
          <Route path="ProductsShow/:x" element={<ProductsShow/>}/>
          <Route path="SpecificProducts/:x" element={<SpecificProducts/>}/>
          <Route path="UserAddress" element={<Useraddress/>}/>
          <Route path="Payment" element={<Payment/>}/>
          <Route path="UserAccount" element={<UserAccount/>}/>
          {/* header */}
          <Route path="Cart" element={<Cart/>}/>
          <Route path="Orders" element={<Orders/>}/>
          <Route path="Login" element={<Login/>}/>
          <Route path="Signup" element={<Signup/>}/>
          {/* footer */}
          <Route path="Contact" element={<Contact/>}/>
          <Route path="Feedback" element={<Feedback/>}/>
          <Route path="OfflineBranches" element={<OfflineBranches/>}/>
          {/* error page */}
          <Route path="*"  element={<Errorpage/>}/>
          {/* <Route path="*" element={<Navigate to="/"/>}/> */}
      </Route>
      </Routes>
    </BrowserRouter> 
    </> 

    // Nested routing
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/"element={<Home/>}/>

    //       <Route path="/Dashboard" element={<Dashboard/>}>
    //          <Route path="Profile" element={<Profile/>}/>
    //          {/* <Route index element={<Profile/>}/> */}
    //          <Route path="Settings" element={<Settings/>}/>
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </>
  );
}
export default App;
