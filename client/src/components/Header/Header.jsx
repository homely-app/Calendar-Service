import React from 'react';

const Header = () => (
  <div className="header-container">
    <div className="header-logo-container">
      <img className="logo" src="/images/airbnb_logo.png" alt="Not Found" />
      <input className="search-bar" defaultValue="Anywhere" />
    </div>
    <div className="header-nav-container">
      <li className="header-nav-item">Become a host</li>
      <li className="header-nav-item">Earn credit</li>
      <li className="header-nav-item">Help</li>
      <li className="header-nav-item">Sign up</li>
      <li className="header-nav-item">Log in</li>
    </div>
  </div>
);

export default Header;
