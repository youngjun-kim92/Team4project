import React from "react";
import "../css/Footer.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const FooterItem = ({ icon, title, children }) => (
  <>
    {title && (
      <div className="footer-info-wrapper">
        <FontAwesomeIcon icon={icon} className="footer-icon" />
        <div className="footer-info-container">
          <h4>{title}</h4>
          <span>{children}</span>
        </div>
      </div>
    )}
  </>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const links = [
    { to: "/", text: "Home" },
    { to: "#", text: "고객센터" },
    { to: "#", text: "이용약관" },
    { to: "#", text: "공지사항" },
    { to: "#", text: "저작권정책" },
    { to: "#", text: "개인정보 처리방침" },
  ];

  return (
    <footer className="footer">
      <div className="footer-primary">
        <div className="footer-section">
          <FooterItem icon={faLocationDot} title="Address">
            서울시 서초구 서초대로
          </FooterItem>
          <FooterItem icon={faPhone} title="Call us">
            02-123-4567
          </FooterItem>
          <FooterItem icon={faEnvelopeOpen} title="Mail us">
            admin@google.com
          </FooterItem>
        </div>

        <div className="footer-section">
          <div className="left">
            <ul>
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} onClick={scrollToTop}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="right">
            <div className="footer-logo">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/KakaoTalk_Photo_2024-06-03-04-06-22.png"
                }
                alt="로고"
              />
            </div>
            <div className={"footer-social"}>
              <FooterItem icon={faInstagram} />
              <FooterItem icon={faYoutube} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
