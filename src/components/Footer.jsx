import {
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineInstagram,
} from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';

import logoIcon from '@/assets/moon-logo-v2.svg';

const navigation = {
  services: [
    { name: 'Trip Planner', href: '#' },
    { name: 'Tour Planning', href: '#' },
    { name: 'Tour Guide', href: '#' },
    { name: 'Tour Package', href: '#' },
    { name: 'Tour Advice', href: '#' },
  ],
  support: [
    { name: 'Account', href: '#' },
    { name: 'Legal', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Terms & Condition', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  business: [
    { name: 'Success', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Location', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Information', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      Icon: <AiOutlineFacebook className="social-icon" />,
    },
    ,
    {
      name: 'Linkedin',
      href: '#',
      Icon: <AiOutlineLinkedin className="social-icon" />,
    },
    {
      name: 'Twitter',
      href: '#',
      Icon: <FiTwitter className="social-icon" />,
    },
    {
      name: 'Instagram',
      href: '#',
      Icon: <AiOutlineInstagram className="social-icon" />,
    },
  ],
};

const Footer = () => {
  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="visually-hidden">
        Footer
      </h2>
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-logo-section">
            <div className="logo">
              <img src={logoIcon} alt="Company name" className="logo-icon" />
              <p className="logo-type">Astro Planner</p>
            </div>
            <p className="footer-description">
              Navigate Your Adventures, Star in Your Journeys.
            </p>
            <div className="social-links social-links-mobile">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="social-link">
                  <span className="visually-hidden">{item.name}</span>
                  {item.Icon}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-links">
            <div className="link-section">
              <h3 className="link-section-title">Services</h3>
              <ul className="link-list">
                {navigation.services.map((item) => (
                  <li key={item.name} className="link-item">
                    <a href={item.href} className="link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="link-section">
              <h3 className="link-section-title">Support</h3>
              <ul className="link-list">
                {navigation.support.map((item) => (
                  <li key={item.name} className="link-item">
                    <a href={item.href} className="link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="link-section">
              <h3 className="link-section-title">Business</h3>
              <ul className="link-list">
                {navigation.business.map((item) => (
                  <li key={item.name} className="link-item">
                    <a href={item.href} className="link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2023 Astro Planner, Inc. All rights reserved.
          </p>
          <div className="social-links social-links-desktop">
            {navigation.social.map((item) => (
              <a key={item.name} href={item.href} className="social-link">
                <span className="visually-hidden">{item.name}</span>
                {item.Icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
