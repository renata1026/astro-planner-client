import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaHome,
  FaBriefcase,
  FaDollarSign,
  FaRegBell,
  FaQuestion,
} from 'react-icons/fa';
import { RiAccountCircleFill } from 'react-icons/ri';
import { AiOutlineLogin } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import DarkModeToggle from '@/components/DarkModeToggle';
import logoIcon from '@/assets/moon-logo-v2.svg';
import userProfilePhoto from '@/assets/userPhoto.png';

const Navbar = ({ user, setUser, setToken }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    // using below class to disable scrolling & add overlay on Mobile after the menu is opened
    document.body.classList.toggle('navbar-open');
    console.log('it works');
  };

  const handleLogout = () => {
    setToken('');
    setUser({});
    localStorage.removeItem('token');
  };

  return (
    <nav className="desktop-navigation">
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
          <div
            className={`navbar-list-fullwidth navbar-none ${
              showNavbar ? 'active' : 'hide'
            }`}
          >
            <li className="navbar-li">
              <NavLink className="flex" to={'/create-trip'}>
                <FaBriefcase className="icon" />
                <span className="nav-text">Create Trip</span>
              </NavLink>
            </li>
            {user.id ? (
              <>
                <span>Welcome {user.firstName}</span>
                <span onClick={handleLogout}>Logout</span>
              </>
            ) : (
              <>
                <li className="navbar-li">
                  <NavLink className="flex" to="/login">
                    <AiOutlineLogin className="icon" />
                    <span className="nav-text">Login</span>
                  </NavLink>
                </li>
                <li className="navbar-li">
                  <NavLink className="flex" to="/register">
                    <RiAccountCircleFill className="icon" />
                    <span className="nav-text">Register</span>
                  </NavLink>
                </li>
              </>
            )}
          </div>

          <div
            className={`navbar-list-fullwidth ${
              showNavbar ? 'active' : 'hide'
            }`}
          >
            <li className="navbar-li">
              <Link to={'#faqs'} className="flex">
                <FaQuestion className="icon" />
                <span className="nav-text">FAQ</span>
              </Link>
            </li>
            <li className="navbar-li notifications">
              <Link to={'#notifications'} className="flex">
                <FaRegBell className="icon" />
                <span className="nav-text">Notifications</span>
              </Link>
            </li>
            <li className="navbar-li">
              <img src={userProfilePhoto} alt="user profile photo" />
            </li>
          </div>

          <div className="theme-toggle">
            <DarkModeToggle />
            <AiOutlineMenu
              className="menu-icon d-lg-none"
              size={30}
              onClick={handleShowNavbar}
            />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
