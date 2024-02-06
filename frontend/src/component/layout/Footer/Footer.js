import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/appstore.png"
import "./Footer.css"
function Footer() {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download app for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
        </div>

        <div className="midFooter">
            <h1>Ecommerce.</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2021 &copy; KerryLi</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="http://instagram.com/meabhisign">Instagram</a>
            <a href="http://youtube.com/6packprogrammer">Youtube</a>
            <a href="http://instagram.com/meabhisign">FaceBook</a>
        </div>
    </footer>
  )
}

export default Footer;