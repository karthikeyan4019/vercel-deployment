// css file
import"./Footer.css";
// router
import { Link, useNavigate } from "react-router-dom";
const Footer=()=>
{
    return(
        <>
        {/* <h1>FOOTER</h1> */}
        <footer>
            <div className="footer">
                <div className="footer-row-1">
                <div className="footer-column-1 footer-item">
                    <h3>LINKS</h3>
                    <Link to="/Contact"><span className="footer-links">Contact</span></Link><br/>
                    <Link to="/Feedback"><span className="footer-links">Feedback</span></Link><br/>
                    <Link to="/OfflineBranches"><span className="footer-links">Offline Branches </span></Link><br/>
                    <p>Contact</p>
                </div>
                <div className="footer-column-2 footer-item">
                <h3>OUR PRODUCTS</h3>
                    <p>Fruits</p>
                    <p>Electronics</p>
                    <p>Clothes</p>
                    <p>Toys</p>
                    <p>Furnitures</p>
                    <p>Grocery</p>
                    <p>And many more...</p>
                </div>
                <div className="footer-column-3 footer-item">
                    <h3>OFFLINE BRANCHES IN INDIA</h3>
                    <p>Chennai</p>
                    <p>Mumbai</p>
                    <p>Bengaluru</p>
                    <p>Hyderabad</p>
                    <p>Jammu & Kashmir</p>
                    <p>Delhi</p>
                    <p>Kolkata</p>
                </div>
                <div className="footer-column-4 footer-item">
                    <h3>CONNECT WITH US</h3>
                    <p><i class="fa-brands fa-facebook fa-lg social-media-icon" style={{color: "#ffffff"}}></i>Facebook</p>
                    <p><i class="fa-brands fa-instagram fa-lg social-media-icon" style={{color: "#ffffff"}}></i>Instagram</p>
                    <p><i class="fa-brands fa-youtube fa-lg social-media-icon" style={{color: "#ffffff"}}></i>Youtube</p>
                </div>
                </div>
                <div className="footer-row-2">
                    <div className="brand country-flags">
                        <img src="/images/logo.png" alt="logo" className="brand-logo"/>
                        <img src="/images/india.png" alt="indian_flag" className="country_flag"/>
                        <img src="/images/australia.png" alt="australian_flag"className="country_flag"/>
                        <img src="/images/united-states.png" alt="usa_flag"className="country_flag"/>
                        <img src="/images/china.png" alt="china_flag"className="country_flag"/>
                        <img src="/images/germany.png" alt="germany_flag"className="country_flag"/>
                    </div>
                </div>
                <div className="footer-row-3">
                   <div class="material-symbols-outlined copyright-icon">copyright</div>
                   <div className="copyright-text">1990-2024 kuvizz.com</div>
                </div>
                <div className="footer-row-4">
                   <p>Designed and Developed By</p>
                   <p>KARTHIKEYAN K</p>
                   <p>Fullstack Developer</p>
                   <p>B.E computer science</p>
                   <i class="fa-brands fa-linkedin fa-lg personal-i-icon" style={{color:"#ffffff"}} ></i>
                   <span className="personal-i"><a href="https://www.linkedin.com/in/karthikeyank05/" target="_blank">karthikeyank05</a></span>
                   <i class="fa-solid fa-envelope fa-lg  personal-i-icon" style={{color: "#ffffff"}}></i>
                   <span className="personal-i">malarvizhi19772020@gmail.com</span>
                   <i class="fa-solid fa-phone-volume fa-lg  personal-i-icon" style={{color:"#ffffff"}}></i>
                   <span className="personal-i">6380242813</span>
                   <p className="institute-name">Trained By : <a href="https://www.fita.in/" target="_blank">FITA ACADEMY CHENNAI</a></p>
                </div>
                
            </div>
        </footer>
        </>
    );
}
export default Footer;