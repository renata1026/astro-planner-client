import { useOutletContext, useParams } from "react-router-dom";

const Confirmation = () => {
  const { tripId } = useParams();
  const { reservations, user } = useOutletContext();

  console.log("reservations", reservations);

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <h2>Confirmation: {tripId}</h2>
      </div>
      <div className="confirmation-info">
        <p>
          You made a trip booking {user?.firstName} {user?.lastName} your
          booking is confirmed. Here is your trip itinerary.
        </p>
      </div>
      <div className="confirmation-table">
        {reservations.map((reservation, i) => (
          <div key={i}>
            {console.log("reservation", reservation)}
            {Object.keys(reservation).map((key, j) => {
              if (key.endsWith("Date")) {
                return (
                  <p key={j}>
                    {key}: {new Date(reservation[key]).toLocaleString()}
                  </p>
                );
              } else if (reservation[key]) {
                return (
                  <p key={j}>
                    {key}: {reservation[key]}
                  </p>
                );
              } else {
                return null;
              }
            })}
          </div>
        ))}
      </div>
      <p className="footer-text">Thank you for doing business with us.</p>
    </div>
  );
};

export default Confirmation;
