import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import "../css/Header.scss";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      setIsScrolled(scroll > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = isScrolled ? "header-scrolled" : "header";
  return (
    <header className={headerClass}>
      <Menu />
    </header>
  );
};

export default Header;
