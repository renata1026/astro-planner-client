import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import format from "date-fns/format";
import { API } from "@/lib/api-index";

const Trips = () => {
  const { trips, reservations, user, token, fetchTrips } = useOutletContext();
  const myTrips = trips.filter((trip) => trip.userId === user.id);
  const myReservations = reservations.filter(
    (reservation) => reservation.userId === user.id,
  );

  const handleDeleteTrip = async (e, tripId) => {
    e.preventDefault();

    const res = await fetch(`${API}/trips/${tripId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    fetchTrips();
    if (!info.success) {
      setError(info.error);
    }

    // Now you can handle the response as needed
  };

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
                <button
                  onClick={(e) => handleDeleteTrip(e, tripId)}
                  className="delete-trip-btn"
                >
                  <FaTrash className="delete-icon" />
                </button>
              </li>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trips;
