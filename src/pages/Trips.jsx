import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import format from "date-fns/format";

const Trips = () => {
  const { trips, reservations, user } = useOutletContext();
  const myTrips = trips.filter((trip) => trip.userId === user.id);
  const myReservations = reservations.filter(
    (reservation) => reservation.userId === user.id,
  );

  return (
    <section className="trip-section">
      <div className="trip-container">
        <div className="trip-header">
          <h2 className="trip-title">My Trips</h2>
        </div>

        <div className="trip-list">
          {myTrips.map((trip) => {
            const tripId = trip.id;
            const checkInStr = trip.checkIn;
            const checkOutStr = trip.checkOut;

            const formattedCheckInDate = format(
              new Date(checkInStr),
              "MMM d, yyyy",
            );
            const formattedCheckOutDate = format(
              new Date(checkOutStr),
              "MMM d, yyyy",
            );
            return (
              <li key={trip.id} className="trip-item">
                <Link to={`/confirmation/${tripId}`} className="trip-link">
                  <h3 className="trip-name">
                    {trip.location
                      .split("_")
                      .map(
                        (word) => `${word.at(0)}${word.slice(1).toLowerCase()}`,
                      )
                      .join(" ")}
                    :{" "}
                    <span className="trip-time">
                      {formattedCheckInDate} - {formattedCheckOutDate}
                    </span>
                  </h3>
                  <p>
                    <span>Trip ID: </span>
                    {trip.id}
                  </p>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trips;
