import howItWorks from "@/assets/howItWorks.png";
import userIcon from "@/assets/userIcon.svg";
import mapIcon from "@/assets/mapIcon.svg";
import navigateIcon from "@/assets/navigateIcon-v2.svg";
import flightIcon from "@/assets/flightIcon-v2.svg";

export default function HowItWorks() {
  return (
    <div className="outside-container">
      <div className="content-container flex">
        <div className="image-container">
          <img className="enlarged-image" src={howItWorks} alt="How it works" />
        </div>

        <div className="how-it-works-container ">
          <div className="how-it-works-heading">
            <h2 className="features-text">How does it work</h2>
            <p className="how-it-works-description">
              We find the absolute best prices on hotels & flights then we pass
              these savings directly to you.
            </p>
          </div>

          <div className="how-it-works-card-content">
            <div className="how-it-works-card flex">
              <div className="it-works-card-image">
                <img className="userIcon" src={userIcon} alt="user icon" />
              </div>
              <div className="how-it-works-text">
                <h3 className="how-it-works-header">Account</h3>
                <p className="works-text">
                  All the necessary information to create your account are below
                  this.
                </p>
              </div>
            </div>

            <div className="how-it-works-card flex">
              <div className="it-works-card-image">
                <img className="mapIcon" src={userIcon} alt="map icon" />
              </div>
              <div className="how-it-works-text">
                <h3 className="how-it-works-header">Select Destination</h3>
                <p className="works-text">
                  At first choose the place you to go to.
                </p>
              </div>
            </div>

            <div className="how-it-works-card flex">
              <div className="it-works-card-image">
                <img
                  className="navigateIcon"
                  src={navigateIcon}
                  alt="navigate icon"
                />
              </div>
              <div className="how-it-works-text">
                <h3 className="how-it-works-header">Book a Trip</h3>
                <p className="works-text">
                  Book your trip from our exclusive offers.
                </p>
              </div>
            </div>

            <div className="how-it-works-card flex">
              <div className="it-works-card-image">
                <img
                  className="flightIcon"
                  src={flightIcon}
                  alt="flight icon"
                />
              </div>
              <div className="how-it-works-text">
                <h3 className="how-it-works-header">Take your flight</h3>
                <p className="works-text">
                  Take your flight on selected date and enjoy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
