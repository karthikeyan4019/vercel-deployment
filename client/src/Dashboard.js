import { Link, Outlet } from "react-router-dom";

function Dashboard()
{
    return(
        <>
          <ul>
            <li><Link to="Profile">Profile</Link></li>
            <li><Link to="Settings">Setting</Link></li>
          </ul>
          {/* <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea in laboriosam labore perspiciatis quibusdam maiores aliquam molestias suscipit animi aspernatur provident ipsam atque officiis, mollitia, quo quas, doloribus necessitatibus sit.</h1> */}
          <Outlet/>
        </>
    ); 
}
export default Dashboard;