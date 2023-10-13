import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AiOutlineMenu } from 'react-icons/ai';
import {
  FaHome,
  FaBriefcase,
  FaPlane,
  FaBlog,
  FaDollarSign,
  FaQuestion,
  FaRegBell,
} from 'react-icons/fa';

import DarkModeToggle from '@/components/DarkModeToggle';
import logoIcon from '@/assets/moon-logo-v2.svg';
import userProfilePhoto from '@/assets/userPhoto.png';

const fetchUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.get('/auth/verify', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const Navigation = ({ user, setUser }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  // const userQuery = useQuery({
  //   queryKey: ['user'],
  //   queryFn: async () => {},
  // });

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    console.log('itworks');
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
                  alt="Astroplaner Logo"
                />
              </li>
              <li style={{ fontWeight: 'bold' }} className="logo-type hide ">
                Astro Planner
              </li>
            </NavLink>
          </div>

          <div
            className={`navbar-list-fullwidth ${
              showNavbar ? 'active' : 'hide'
            }`}
          >
            <li className="navbar-li">
              <Link className="flex" to={'/'}>
                <FaHome className="icon" />
                <span className="nav-text ">Home</span>
              </Link>
            </li>
            <li className="navbar-li">
              <NavLink className="flex" to={'/things-to-do'}>
                <FaBriefcase className="icon" />
                <span className="nav-text">To Do</span>
              </NavLink>
            </li>
            <li className="navbar-li">
              <NavLink className="flex" to={'/tour'}>
                <FaPlane className="icon" />
                <span className="nav-text">Tour</span>
              </NavLink>
            </li>
            <li className="navbar-li">
              <NavLink className="flex" to={'/blog'}>
                <FaBlog className="icon" />
                <span className="nav-text">Blog</span>
              </NavLink>
            </li>
          </div>
          <div
            className={`navbar-list-fullwidth ${
              showNavbar ? 'active' : 'hide'
            }`}
          >
            <li className="navbar-li">
              <Link className="flex" to={'/usd'}>
                <FaDollarSign className="icon" />
                <span className="nav-text">USD</span>
              </Link>
            </li>
            <li className="navbar-li">
              <Link className="flex" to={'/faqs'}>
                <FaQuestion className="icon" />
                <span className="nav-text">FAQ</span>
              </Link>
            </li>
            <li className="navbar-li">
              <Link className="flex" to={'/notifications'}>
                <FaRegBell className="icon" />
              </Link>
            </li>
            <li className="navbar-li">
              <img src={userProfilePhoto} alt="user profile photo" />
            </li>
          </div>
          <div className="flex">
            <DarkModeToggle />
            <AiOutlineMenu
              className="menu-icon"
              size={30}
              onClick={handleShowNavbar}
            />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
