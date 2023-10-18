import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import airplane from "@/assets/airplane-reservation.jpg";
import car from "@/assets/car-reservation.jpg";
import hotel from "@/assets/hotel-reservation.jpg";
import { GrEdit } from "react-icons/gr";

const Confirmation = () => {
  const { tripId } = useParams();
  const { reservations, user, trips } = useOutletContext();

  const navigate = useNavigate();

  // console.log("reservations", reservations);
  // fetchTrips();
  const trip = trips.find((trip) => trip.id === tripId);

  const filteredReservations = reservations.filter(
    (reservation) => reservation.tripId === tripId,
  );

  const reservationId = filteredReservations[0].id;
  console.log(filteredReservations[0].id);

  const checkInStr = trip?.checkIn;
  const checkInDate = new Date(checkInStr);
  const checkOutStr = trip?.checkOut;
  const checkOutDate = new Date(checkOutStr);

  const formattedCheckInDate = `${checkInDate.toLocaleString("default", {
    month: "short",
  })} ${checkInDate.getDate()}, ${checkInDate.getFullYear()}`;

  const formattedCheckOutDate = `${checkOutDate.toLocaleString("default", {
    month: "short",
  })} ${checkOutDate.getDate()}, ${checkOutDate.getFullYear()}`;

  // console.log("filteredList", filteredList);

  return (
    <section className="confirmation-section">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <h2>
            {trip?.location
              .split("_")
              .map((word) => `${word.at(0)}${word.slice(1).toLowerCase()}`)
              .join(" ")}
          </h2>
          <time>
            {formattedCheckInDate} - {formattedCheckOutDate}
          </time>
        </div>
        <div className="confirmation-info">
          <h3>Your Bookings</h3>
        </div>
        <div className="reservations-list">
          {filteredReservations.map((reservation, i) => (
            <div key={i} className="reservation-card">
              <div className="reservation-image-container">
                {reservation.airlineName && <img src={airplane} alt="" />}
                {reservation.carRentalAgency && <img src={car} alt="" />}
                {reservation.hotelName && <img src={hotel} alt="" />}
              </div>

              <div className="reservation-body">
                {/* {console.log("reservation", reservation)} */}
                {Object.keys(reservation)
                  .filter(
                    (key) =>
                      key !== "id" && key !== "userId" && key !== "tripId",
                  )
                  .map((key, j) => {
                    let newKey = key.replace(/([A-Z])/g, " $1").trim();
                    newKey = newKey.charAt(0).toUpperCase() + newKey.slice(1);
                    if (key.endsWith("Date")) {
                      return (
                        <p key={j}>
                          <span className="reservation-label">{newKey}:</span>{" "}
                          {new Date(reservation[key]).toLocaleDateString()}
                        </p>
                      );
                    } else if (reservation[key]) {
                      return (
                        <p key={j}>
                          <span className="reservation-label">{newKey}:</span>{" "}
                          {reservation[key]}
                        </p>
                      );
                    } else {
                      return null;
                    }
                  })}

                <GrEdit
                  onClick={() =>
                    navigate(`edit/flight/reservation/${reservationId}`)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
