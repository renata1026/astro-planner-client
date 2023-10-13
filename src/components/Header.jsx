import { FaArrowRight } from 'react-icons/fa';

import heroImage from '@/assets/hero-image.png';
import backgroundImage from '@/assets/background-image.png';
import backgroundDotImage from '@/assets/Ornament-82.png';
import reviewImage from '@/assets/review.png';
import swirlArrow from '@/assets/swirl-arrow.png';
import card from '@/assets/card.png';

const Header = () => {
  return (
    <div>
      <div className="header-container">
        <div className="col-one">
          <div className="header-text-wrapper">
            <h1 className="main-heading">
              Travel Planning
              <br />
              Made
              <span className="highlight-text"> Easy</span>
            </h1>
            <p className="tagline">
              We make it easy to plan and book your next trip with a Day by Day
              itinerary
            </p>
            <form className="search-form">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Plan a Trip"
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <FaArrowRight />
                </button>
              </div>
            </form>
          </div>
          <div className="swirl-arrow">
            <img src={swirlArrow} alt="swirl arrow" />
          </div>
          <div className="customer-reviews">
            <img src={reviewImage} alt="review" className="review-image" />
          </div>
        </div>
        <div className="col-two">
          <img src={backgroundImage} className="blur-image" />
          <img src={backgroundDotImage} className="dot-image" />
          <div className="hero-image">
            <img src={heroImage} alt="hero image" />
            <img className="header-card" src={card} alt="card" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
