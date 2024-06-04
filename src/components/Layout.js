import React from 'react';
import { Outlet } from 'react-router-dom';
import '../css/Layout.scss';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <div className="layout">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
