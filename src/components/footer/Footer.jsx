import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          {/* TODO : will add all the links clickable */}
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Movies and TV series have a special place in our hearts, captivating
          our imaginations and leaving an indelible mark. From the classics to
          the latest releases, they have the power to evoke emotions, bring
          people together, and inspire us to explore new worlds. So, let us
          embrace this unique form of storytelling, bask in its magic, and get
          lost in the world of movies and TV series.
        </div>
        <div className="socialIcons">
          <span className="icon">
            <FaFacebookF />
          </span>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
        {/* Point : copyRight section */}
        <div className="copyRight">
          developed by{" "}
          <a href="https://github.com/devoloper-rakib" className="name">
            Rakib Hasan Sohag
          </a>{" "}
          | <span>{currentYear}</span>
          <span className="dot-animation">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};
export default Footer;
