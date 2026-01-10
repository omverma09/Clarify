import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineWhatsapp } from "react-icons/md";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* CTA SECTION */}
      <section className="cta-section md:-mx-0">
        <div className="cta-overlay">
          <div className="cta-content">
            <h3>
              I’m a Full Stack Web Developer skilled in the MERN stack,
              passionate about building clean, user-friendly, and scalable web
              applications.
            </h3>
            <button className="cta-btn">LEARN MORE</button>
          </div>
        </div>
      </section>

      {/* FOOTER TOP (BLUE STRIP) */}
      <div className="footer-top">
        <div className="container footer-top-inner">
          <ul className="footer-links">
            <li>Home</li>
            <li>Services</li>
            <li>Projects</li>
            <li>Testimonials</li>
            <li>Contact</li>
          </ul>

          <div className="newsletter">
            <span>Subscribe Us</span>
            <form className="subscribe-box">
              <input
              className="inp"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <footer className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>Copyright preserve by Omverma  ©</p>

          <div className="social-icons">
            <span><FaInstagram /></span>
            <span><FaFacebook /></span>
            <span><FaSquareXTwitter /></span>
            <span><MdOutlineWhatsapp /></span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;