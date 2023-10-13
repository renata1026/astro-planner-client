import tripAdvisor from '@/assets/tripAdvisor.png';
import airbnb from '@/assets/airbnb.png';
import cargo from '@/assets/cargo.png';
import itata from '@/assets/itata.png';
import hands from '@/assets/hands-hd.png';
import skeletonCard from '@/assets/skeleton-card.svg';
import book from '@/assets/book.svg';

export default function EasyTripBooking() {
  return (
    <section className="booking-section">
      <div className="main-container">
        <div className="big-card">
          <div className="big-card-content">
            <div className="top-content">
              <img src={hands} alt="" className="avatar" />
              <div>
                <h3>Welcome to Astro Planner</h3>
                <p>Please select one</p>
              </div>
            </div>
            <div className="bottom-content">
              <img src={skeletonCard} alt="" className="skeleton-card" />
              <img src={book} alt="" className="book-now" />
            </div>
          </div>
        </div>
        <div className="">
          <div className="description-container">
            <h2>Easy Trip Booking Website</h2>
            <div className="">
              <p className="">
                A new way to book travel online, saving you time. With trip,
                there are no confusing spreadsheets or complicated searches. We
                just ask the right questions, find the best deal for you, then
                book it.
              </p>
            </div>
          </div>
          <div className="card-content">
            {[
              { src: tripAdvisor, alt: 'TripAdvisor', title: 'Trip Advisor' },
              { src: airbnb, alt: 'Airbnb', title: 'Airbnb' },
              { src: cargo, alt: 'Turkish cargo', title: 'Turkish Kargo' },
              { src: itata, alt: 'Itata', title: 'Itata' },
            ].map(({ src, alt, title }, index) => (
              <div className="individual-card" key={index}>
                <img className="logo" src={src} alt={alt} />
                <div className="card-details">
                  <h3>{title}</h3>
                  <div>
                    <p>
                      {title === 'Airbnb' ? 'Lots of choices' : 'Cheap flights'}
                    </p>
                    <p>Amazing experiences</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
