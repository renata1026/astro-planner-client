import { useState } from "react";
import {
  useNavigate,
  useOutletContext,
  useParams,
  Link,
} from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";

import airplane from "@/assets/airplane-reservation.jpg";
import car from "@/assets/car-reservation.jpg";
import hotel from "@/assets/hotel-reservation.jpg";
import { API } from "@/lib/api-index";

import StaggeredDropDown from "@/components/StaggeredDropDown";

const Confirmation = () => {
  const [error, setError] = useState("");

  const { tripId } = useParams();
  const { reservations, user, trips, fetchReservations, token } =
    useOutletContext();

  const navigate = useNavigate();

  // console.log("reservations", reservations);
  // fetchTrips();
  const trip = trips.find((trip) => trip.id === tripId);

  const filteredReservations = reservations.filter(
    (reservation) => reservation.tripId === tripId,
  );

  // const reservationId = filteredReservations[0]?.id;
  // console.log(filteredReservations[0]?.id);
  //   console.log('filteredReservations', filteredReservations)
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

  async function handleDeleteReservation(e, reservationId) {
    console.log(reservationId);
    setError("");
    e.preventDefault();

    const res = await fetch(`${API}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();
    console.log(info);

    fetchReservations();

    if (!info.success) {
      setError(info.error);
    }

    // Now you can handle the response as needed
  }
  console.log(filteredReservations);
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
          {filteredReservations.map((reservation, i) => {
            const reservationId = reservation.id;
            let reservationType;
            if (reservation.airlineName) {
              reservationType = "flight";
            } else if (reservation.carRentalAgency) {
              reservationType = "car";
            } else if (reservation.hotelName) {
              reservationType = "hotel";
            }

            return (
              <div key={i} className="reservation-card">
                <div className="reservation-image-container">
                  {reservationType === "flight" && (
                    <img src={airplane} alt="" />
                  )}
                  {reservationType === "car" && <img src={car} alt="" />}
                  {reservationType === "hotel" && <img src={hotel} alt="" />}
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
                  <div className="buttons-container">
                    <Link
                      to={`/edit/${reservationType}/reservation/${reservationId}`}
                      className="edit-button"
                    >
                      <GrEdit className="edit-icon" />
                    </Link>
                    <button
                      onClick={(e) => handleDeleteReservation(e, reservationId)}
                      className="delete-button"
                    >
                      <FaTrash className="delete-icon" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <StaggeredDropDown tripId={tripId} />
      </div>
    </section>
  );
};

export default Confirmation;
