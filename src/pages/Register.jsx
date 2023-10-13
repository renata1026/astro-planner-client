import React, { useState } from 'react';
import { API } from '../lib/api-index';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  BiLogoFacebookCircle,
  BiLogoGooglePlusCircle,
  BiLogoTwitter,
} from 'react-icons/bi';

const Register = () => {
  const { user, setUser, setToken } = useOutletContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setUser(`You are now registered ${user}`);

    const res = await fetch(`${API}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const info = await res.json();
    console.log(info);
    if (!info.success) {
      return setError(info.error);
    }
    setToken(info.token);
    localStorage.setItem('token', info.token);
    // Redirect the user to the home page
    navigate('/');
    setIsRegister(true);
  };

  return (
    <div className="form-wrapper">
      {isRegister ? (
        <div>
          <p className="successful">You are now registered!</p>
          <div className="signup-container flex-col">
            <h2>Get started</h2>
            <div className="flex">
              <ul className="social-icons flex">
                <li>
                  <button className="social-button">
                    <BiLogoFacebookCircle size={24} color="#4776D0" />
                  </button>
                </li>
                <li>
                  <button className="social-button">
                    <BiLogoGooglePlusCircle size={24} />
                  </button>
                </li>
                <li>
                  <button className="social-button">
                    <BiLogoTwitter size={24} color="#01AEEF" />
                  </button>
                </li>
              </ul>
            </div>
            <p>or register with email</p>
          </div>
        </div>
      ) : (
        <div>
          <form className="register-form flex-col" onSubmit={handleRegister}>
            <label htmlFor="firstName">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter Your First Name"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Your Last Name"
            />
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email"
            />
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="********"
            />
            <div className="flex">
              <label htmlFor="checkbox flex">
                <input type="checkbox" />
                Remember me
                <span style={{ fontSize: '14px' }} className="forgot-password">
                  Forgot Password?
                </span>
              </label>
            </div>
            <button type="submit" className="register-button">
              Sign up
            </button>
          </form>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
