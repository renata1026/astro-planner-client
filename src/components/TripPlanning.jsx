import { Link } from 'react-router-dom';

import LightIcon from '@/assets/lightIcon.svg';
import WebsiteIcon from '@/assets/websiteIcon.svg';
import EbookIcon from '@/assets/eBookIcon.svg';
import RightArrowIcon from '@/assets/rightArrow.svg';

export default function InnovativeTripPlanning() {
  return (
    <section className="trip-planning-container">
      <div className="trip-planning-content">
        <h2 className="trip-planning-title">Innovative Trip Planning</h2>
        <p className="trip-planning-description">
          Our vision is to revolutionize the way people travel by introducing
          <span className="block">intelligent trip planning.</span>
        </p>
      </div>
      <div className="trip-planning-card-container flex">
        <div className="trip-card">
          <div className="light-icon">
            <img src={LightIcon} alt="Light Icon" />
          </div>
          <div className="trip-card-content flex-col">
            <p className="card-description">
              Browse our partners for amazing deals!
            </p>
          </div>
          <Link to="/">
            <div className="learn-more">
              <p className="learn-more-text text">Learn more</p>
              <img src={RightArrowIcon} alt="Learn more" />
            </div>
          </Link>
        </div>
        <div className="trip-card">
          <div className="website-icon">
            <img src={WebsiteIcon} alt="Website Icon" />
          </div>
          <div className="card-content">
            <p className="card-description">
              Book your travel from the comfort of your home!
            </p>
          </div>
          <Link to="/">
            <div className="learn-more">
              <p className="learn-more-text text">Learn more</p>
              <img src={RightArrowIcon} alt="Learn more" />
            </div>
          </Link>
        </div>
        <div className="trip-card">
          <div className="ebook-icon">
            <img src={EbookIcon} alt="Ebook Icon" />
          </div>
          <div className="card-content">
            <p className="card-description">
              Check out our travel eBook. It is a new way to look at travel.
            </p>
          </div>
          <Link to="/">
            <div className="learn-more">
              <p className="learn-more-text text">Learn more</p>
              <img src={RightArrowIcon} alt="Learn more" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
