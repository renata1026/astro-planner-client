import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaBriefcase,
  FaPlane,
  FaBlog,
  FaDollarSign,
  FaQuestion,
  FaRegBell,
} from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import DarkModeToggle from '@/components/DarkModeToggle';
import logoIcon from '@/assets/moon-logo-v2.svg';
import userProfilePhoto from '@/assets/userPhoto.png';

const Navigation = ({ user, setUser, setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = () => {
    setToken('');
    setUser({});
    localStorage.removeItem('token');
  };

  return (
    <nav className="desktop-navigation">
      {/* Logo and Brand */}
      <div className="navbar-container">
        <ul className="navbar-list">
          <div className="navbar-list-fullwidth">
            <NavLink to="/" className="flex">
              <li className="navbar-list-fullwidth">
                <img
                  className="logo-icon"
                  src={logoIcon}
                  size={24}
                  alt="Astroplanner Logo"
                />
              </li>
              <li style={{ fontWeight: 'bold' }} className="logo-type hide">
                Astro Planner
              </li>
            </NavLink>
          </div>
        </ul>

        {/* Main Navigation Links */}
        <div
          className={`navbar-list-fullwidth ${showNavbar ? 'active' : 'hide'}`}
        >
          <NavLinkTo to="/" icon={<FaHome className="icon" />} text="Home" />
          <NavLinkTo
            to="/things-to-do"
            icon={<FaBriefcase className="icon" />}
            text="To Do"
          />
          <NavLinkTo
            to="/tour"
            icon={<FaPlane className="icon" />}
            text="Tour"
          />
          <NavLinkTo
            to="/blog"
            icon={<FaBlog className="icon" />}
            text="Blog"
          />
        </div>

        {/* Other Navigation Links */}
        <div
          className={`navbar-list-fullwidth ${showNavbar ? 'active' : 'hide'}`}
        >
          <NavLinkTo
            to="/usd"
            icon={<FaDollarSign className="icon" />}
            text="USD"
          />
          <NavLinkTo
            to="/faqs"
            icon={<FaQuestion className="icon" />}
            text="FAQ"
          />
          <NavLink to="/notifications">
            <FaRegBell className="icon" />
          </NavLink>
          <li className="navbar-li">
            <img src={userProfilePhoto} alt="user profile photo" />
          </li>
        </div>

        {/* Dark Mode Toggle and Mobile Menu Icon */}
        <div className="flex">
          <DarkModeToggle />
          <AiOutlineMenu
            className="menu-icon"
            size={30}
            onClick={handleShowNavbar}
          />
        </div>
      </div>

      {/* User Authentication Links */}
      <ul className="navbar-list">
        {user.id ? (
          <>
            <span>Welcome {user.firstName}</span>
            <NavLink onClick={handleLogout} to={'/'}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

// Custom component to render NavLink with icon and text
const NavLinkTo = ({ to, icon, text }) => (
  <li className="navbar-li">
    <NavLink className="flex" to={to}>
      {icon}
      <span className="nav-text">{text}</span>
    </NavLink>
  </li>
);

export default Navigation;
