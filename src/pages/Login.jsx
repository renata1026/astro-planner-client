import {
  BiLogoFacebookCircle,
  BiLogoGooglePlusCircle,
  BiLogoTwitter,
} from 'react-icons/bi';
import { useState } from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api-index';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch(`${API}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    setToken(info.token);
    localStorage.setItem('token', info.token);
    navigate('/');
  }

  return (
    <div className="form-wrapper">
      <div className="signup-container flex-col">
        <h2>Get started</h2>
        <p className="text-gray">
          Don't have an account?{' '}
          <Link to="/register" className="signup-link">
            Sign up
          </Link>
        </p>
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
        <p>or login with email</p>
        <form className="login-form flex-col" onSubmit={handleLogin}>
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
              <span
                style={{ fontSize: '14px' }}
                className="forgot-password text"
              >
                Forgot Password?
              </span>
            </label>
          </div>
          <button className="signin-button" type="submit">
            Sign in
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};
export default Login;
