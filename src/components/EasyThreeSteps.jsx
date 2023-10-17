import { PiArrowRightBold } from "react-icons/pi";

import manSmiling from "@/assets/man-smiling.png";

const EasyThreeSteps = () => {
  return (
    <section className="easy-steps-section">
      <div className="container easy-steps-container">
        <div className="steps-column">
          <div className="steps-card">
            <div className="steps-content">
              <p className="steps-title">Create your Trip</p>
              <p className="steps-description">Set up all trip</p>
              <div className="trip-input-container">
                <input
                  type="text"
                  className="trip-input"
                  placeholder="Plan a Trip"
                />
                <PiArrowRightBold className="arrow-icon" />
              </div>
              <div className="radio-group-container">
                <div className="radio-group">
                  <div className="radio-label-container">
                    <input type="radio" className="radio-input" checked />
                    <label className="radio-label">Set Up your Account</label>
                  </div>
                  <p className="radio-description">Book your best experience</p>
                </div>
                <div className="radio-group">
                  <div className="radio-label-container">
                    <input type="radio" className="radio-input" checked />
                    <label className="radio-label">Day by day Plan</label>
                  </div>
                  <p className="radio-description">Book your best experience</p>
                </div>
                <div className="radio-group">
                  <div className="radio-label-container">
                    <input type="radio" className="radio-input" checked />
                    <label className="radio-label">Booking System</label>
                  </div>
                  <p className="radio-description">Book your best experience</p>
                </div>
              </div>
            </div>
            <div className="price-tag">
              <p>
                $50.00 <span>/ per Trip</span>
              </p>
            </div>
          </div>
        </div>
        <div className="info-column">
          <div className="info-card">
            <h2 className="info-title">Book Easy 3 Steps</h2>
            <p className="info-description">
              Planning a trip is sometimes not easy. But Trip Plan will help you
              to manage time and budget for your journey! There are only 3
              steps: Create an account, choose your destination city.
            </p>
            <div className="radio-group-bottom-container">
              <div className="radio-group-two">
                <input type="radio" className="radio-input-two" />
                <label className="radio-label-two">Set Up your Account</label>
              </div>
              <div className="radio-group-two">
                <input type="radio" className="radio-input-two" />
                <label className="radio-label-two">
                  Response to Private requests
                </label>
              </div>
              <div className="radio-group-two">
                <input type="radio" className="radio-input-two" />
                <label className="radio-label-two">Book your Trip</label>
              </div>
            </div>
            <div className="dotted"></div>
            <p className="info-footer">
              Plan your trip with a 3-step trip plan. Check in out at a glance,
              select hotel rooms on the go, and create a packing list
            </p>
            <div className="testimonial">
              <img src={manSmiling} alt="image" className="testimonial-image" />
              <div className="testimonial-content">
                <p className="testimonial-name">Steve Jobs</p>
                <p className="testimonial-title">Co-Founder and CEO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyThreeSteps;
