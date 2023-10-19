import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBriefcase, FaQuestion, FaMapPin } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import DarkModeToggle from "@/components/DarkModeToggle";
import logoIcon from "@/assets/logo.svg";
import userProfilePhoto from "@/assets/default-avatar.svg";

const Navbar = ({ user, setUser, setToken, reservations, trips }) => {
  const navigate = useNavigate();
  const trip = trips.find((trip) => trip.userId === user.id);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    // using the class below to disable scrolling & add overlay on Mobile after the menu is opened
    document.body.classList.toggle("navbar-open");
    console.log("it works");
  };

  const handleLogout = () => {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
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
              <li style={{ fontWeight: "bold" }} className="logo-type hide">
                Astro Planner
              </li>
            </NavLink>
          </div>
          <div
            className={`navbar-list-fullwidth navbar-none ${
              showNavbar ? "active" : "hide"
            }`}
          >
            <li className="navbar-li">
              <NavLink className="flex" to={"/create-trip"}>
                <FaBriefcase className="icon" />
                <span className="nav-text">Create Trip</span>
              </NavLink>
            </li>
            {user.id ? (
              <>
                <span>
                  Welcome{" "}
                  {`${user.firstName[0].toUpperCase()}${user.firstName.slice(
                    1,
                  )}`}
                </span>
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
              showNavbar ? "active" : "hide"
            }`}
          >
            <li className="navbar-li">
              <Link to="/faq" className="flex">
                <FaQuestion className="icon" />
                <span className="nav-text">FAQ</span>
              </Link>
            </li>
            {user.id && user.profileImage ? (
              <Link to="/profile" className="navbar-li">
                <img
                  src={user.profileImage}
                  alt="user profile photo"
                  style={{ maxHeight: "32px" }}
                />
              </Link>
            ) : user.id && !user.profileImage ? (
              <Link
                to="/profile"
                className="navbar-li"
                style={{ overflow: "hidden" }}
              >
                <img
                  className="profile-photo"
                  src={userProfilePhoto}
                  alt="user profile photo"
                  style={{ maxHeight: "32px", borderRadius: "50%!important" }}
                />
              </Link>
            ) : null}
            {user.id && trip ? (
              <>
                <li className="navbar-li notifications">
                  <NavLink className="flex" to="/trips">
                    <FaMapPin className="map-icon" />
                    <span className="nav-text">Itinerary</span>
                  </NavLink>
                </li>
              </>
            ) : (
              // Handle the case when 'trip' is not found
              <li className="navbar-li">
                <span className="nav-text">
                  <></>
                </span>
              </li>
            )}
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
