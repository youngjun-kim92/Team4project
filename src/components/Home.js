import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideshowImages = [
    process.env.PUBLIC_URL + '/images/KakaoTalk_Photo_2024-05-31-10-24-18.jpeg',
    process.env.PUBLIC_URL + '/images/KakaoTalk_20240603_141819858.jpg',
    process.env.PUBLIC_URL + '/images/KakaoTalk_20240603_141551724.jpg',
  ];
  const nextImageDelay = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % slideshowImages.length
      );
    }, nextImageDelay);

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  return (
    <div className="intro-slideshow">
      {slideshowImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          style={{ opacity: currentImageIndex === index ? 1 : 0 }}
          className="slideshow-image"
        />
      ))}
    </div>
  );
};

const HoverButtons = ({ buttons, onHover, onLeave }) => {
  const handleMouseEnter = (button) => {
    onHover(button);
  };

  const handleMouseLeave = (button) => {
    onLeave(button); // 마우스가 떠났을 때 이벤트를 처리
  };

  return (
    <div className="home-button-wrapper">
      {buttons.map((button) => (
        <button className="home-btn" key={button.id}>
          <Link
            to={button.link}
            onMouseEnter={() => handleMouseEnter(button)}
            onMouseLeave={() => handleMouseLeave(button)}
          >
            <span className="home-btn-label">{button.label}</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </button>
      ))}
    </div>
  );
};

const Home = () => {
  // 버튼 정보 배열
  const buttonsInfo = [
    {
      id: 1,
      label: '복지 안내', // 버튼
      title: '복지 및 혜택', // 타이틀
      description: (
        <>
          <p>경기도의 혁신적인 복지 서비스 탐험하기</p>
          <p>교통 약자를 위한 복지 및 혜택에 대해 알려드립니다</p>
        </>
      ),
      link: '/welfare',
      image:
        process.env.PUBLIC_URL +
        '/images/KakaoTalk_Photo_2024-05-31-12-56-50.jpeg',
    },
    {
      id: 2,
      label: '사고 지역',
      title: '사고 다발 지역 안내',
      description: (
        <>
          <p>위험 지역 파악! 안전한 통행의 첫걸음</p>
          <p>경기도 내에 사고 다발 지역을 알려드립니다</p>
        </>
      ),
      link: '/accident',
      image:
        process.env.PUBLIC_URL + '/images/KakaoTalk_20240603_115523542_02.jpg',
    },
    {
      id: 3,
      label: '최적 경로 안내',
      title: '맞춤 경로 승강기 안내',
      description: (
        <>
          <p>편리함과 안전성을 겸비한 스마트 경로 안내 시스템</p>
          <p>보행자 최적 경로 안내 및 역 근처 승강기 위치를 알려드립니다</p>
        </>
      ),
      link: '/navigation',
      image:
        process.env.PUBLIC_URL + '/images/KakaoTalk_20240603_115523542_01.jpg',
    },
    {
      id: 4,
      label: '제보게시판',
      title: '제보게시판',
      description: (
        <>
          <p>불편함을 말하고 변화를 이끌어내는 제보게시판</p>
          <p>사이트와 관련된 의견을 올릴 수 있는 공간입니다</p>
        </>
      ),
      link: '/community',
      image:
        process.env.PUBLIC_URL + '/images/KakaoTalk_20240603_115523542.jpg',
    },
  ];

  const [hoveredButton, setHoveredButton] = useState(() =>
    buttonsInfo.find((button) => button.id === 1)
  );

  const [activeButton, setActiveButton] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (hoveredButton) {
      setIsFadingOut(true);
      const timeout = setTimeout(() => {
        setActiveButton(hoveredButton);
        setIsFadingOut(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [hoveredButton]);

  const handleHover = (button) => {
    if (activeButton && activeButton.id === button.id) {
      return;
    }
    setHoveredButton(button);
  };

  return (
    <div className="home">
      <Slideshow />
      <div className="home-wrapper">
        <div className="home-title">
          <h2>교통 약자를 위한 정보 전달 서비스</h2>
        </div>
        <div className="home-section">
          <div className="home-section-img">
            {activeButton && (
              <img
                src={activeButton.image}
                alt=""
                // fade out 상태가 아니면 active 클래스를, 아니면 fade-out 클래스 추가
                className={`${!isFadingOut ? 'active' : 'fade-out'}`}
              />
            )}
          </div>
          <div className="home-section-info">
            {activeButton && (
              <div
                className={`home-contents ${
                  !isFadingOut ? 'active' : 'fade-out'
                }`}
              >
                <h2>{activeButton.title}</h2>
                <div className="home-contents-description">
                  {activeButton.description}
                </div>
              </div>
            )}
            <HoverButtons
              buttons={buttonsInfo}
              onHover={handleHover}
              onLeave={() => {}} // 마우스가 떠난 경우 처리는 생략
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
