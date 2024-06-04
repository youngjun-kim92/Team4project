import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Menu.scss';

const navi = [
  { name: 'navigation', text: '최적 경로 안내' },
  { name: 'accident', text: '사고 다발 지역 안내' },
  { name: 'welfare', text: '복지 안내' },
  { name: 'community', text: '제보 게시판' },
];

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const Menu = () => {
  const location = useLocation();

  return (
    <div className="menubox">
      <h1 className="logo">
        <Link to="/" className="home" onClick={scrollToTop}>
          <img
            src={
              process.env.PUBLIC_URL +
              '/images/KakaoTalk_Photo_2024-06-03-04-06-22.png'
            }
            alt="로고"
          />
        </Link>
      </h1>

      <div className="header-menu">
        {navi.map((n) => (
          <Link
            to={`/${n.name}`}
            className={`header-link ${
              location.pathname === `/${n.name}` ? 'selected' : ''
            }`}
          >
            <div className="header-text">{n.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
