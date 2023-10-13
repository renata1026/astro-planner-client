import Hotel from '@/assets/hotel.png';
import Restaurant from '@/assets/restaurant.png';
import Rout from '@/assets/rout.svg';
import Star from '@/assets/star.svg';

const AirtravBestServices = () => {
  return (
    <section className="airtrav-best-services">
      <div className="airtrav-best-services-container">
        <h2>Airtrav Best Services</h2>
        <p className="light">
          Enjoy the best services offered by Airtrav and book amazing trips by
          plane.
        </p>
        <div className="airtrav-best-services-cards">
          <article className="service-card">
            <figure className="service-icon ">
              <img src={Hotel} size={24} alt="hotel icon" className="blue" />
            </figure>
            <h3 className="service-title">100,000</h3>
            <p className="service-description">cities all over the world</p>
          </article>

          <article className="service-card">
            <figure className="service-icon ">
              <img
                src={Restaurant}
                size={24}
                alt="restaurant icon"
                className="green"
              />
            </figure>
            <h3 className="service-title ">100</h3>
            <p className="service-description">Gift card over the world</p>
          </article>

          <article className="service-card">
            <figure className="service-icon">
              <img src={Rout} size={24} alt="rout icon" className="orange" />
            </figure>
            <h3 className="service-title">1000</h3>
            <p className="service-description">Guest referrals over</p>
          </article>

          <article className="service-card">
            <figure className="service-icon">
              <img
                src={Star}
                size={24}
                alt="five star icon"
                className="yellow"
              />
            </figure>
            <h3 className="service-title">5 Star</h3>
            <p className="service-description">Reviews Customer</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AirtravBestServices;
