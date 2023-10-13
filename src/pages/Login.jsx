import {
  BiLogoFacebookCircle,
  BiLogoGooglePlusCircle,
  BiLogoTwitter,
} from 'react-icons/bi';
import axios from 'axios';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Login = () => {
  const queryClient = useQueryClient();
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => {
      console.log('formData', formData);
      console.log('vite', import.meta.env.VITE_BASE_API_URL);
      return axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/users/login`,
        formData
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
        <form className="login-form flex-col" onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  );
};
export default Login;
