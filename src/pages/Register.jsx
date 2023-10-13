import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BiLogoFacebookCircle,
  BiLogoGooglePlusCircle,
  BiLogoTwitter,
} from 'react-icons/bi';

const Register = () => {
  const queryClient = useQueryClient();
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newUser) => {
      console.log('newUser', newUser);
      console.log('vite', import.meta.env.VITE_BASE_API_URL);
      return axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/users/signup`,
        newUser
      );
    },
    onSuccess: (res) => {
      console.log('res', res);
      console.log('res', res.data);
      setUser(res.data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log('formData', formData);
    const formJson = Object.fromEntries(formData);
    console.log('formJson', formJson);
    mutation.mutate(formJson);
  };

  return (
    <div className="form-wrapper">
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
        <form className="register-form flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter Your First Name"
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Your Last Name"
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Your Email"
          />
          <label htmlFor="password">Password</label>
          <input
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
    </div>
  );
};
export default Register;
