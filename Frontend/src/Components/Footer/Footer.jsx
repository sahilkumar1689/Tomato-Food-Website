import React from "react";
import "./Footer.css";
import { memo } from "react";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer" id="footerContact">
      <div className="footerContent">
        <div className="footerContentLeft">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
            qui quasi distinctio similique quod odio temporibus rerum,
            voluptatibus ab dolores, expedita hic voluptas. Cupiditate
            dignissimos iusto eveniet? Nam omnis voluptatem aspernatur
            voluptatum placeat laudantium deserunt molestiae? Corporis ullam,
            perferendis atque ut ducimus dolores facere, repudiandae inventore,
            nobis maxime tenetur praesentium.
          </p>
          <div className="footerIcons">
            <img src={assets.facebook_icon} alt="facebookIcon" />
            <img src={assets.twitter_icon} alt="twitterIcon" />
            <img src={assets.linkedin_icon} alt="linkedinIcon" />
          </div>
        </div>

        <div className="footerContentCenter">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery </li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footerContentRight">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91-555-555-555</li>
            <li>Contact@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="copyRight">Copyright2024@Tomato.com - All Right Reserved</p>
    </div>
  );
}

export default memo(Footer);
