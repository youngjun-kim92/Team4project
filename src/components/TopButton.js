import React, { useEffect, useState } from 'react';
import '../css/TopButton.scss';

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const showButtonClick = () => {
      if (window.scrollY > 800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', showButtonClick);
    return () => {
      window.removeEventListener('scroll', showButtonClick);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div className="top-button-container">
          <button className="top-button" onClick={scrollTop} type="button">
            Top
          </button>
        </div>
      )}
    </>
  );
};

export default TopButton;
