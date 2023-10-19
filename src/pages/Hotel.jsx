import React, { useState } from "react";
import { format, addDays } from "date-fns";
import ReservationIcon from "@/assets/hotelTwo.svg";
import Map from "@/assets/travel-pic.jpg";
import {
  useNavigate,
  useOutletContext,
  useParams,
  Link,
} from "react-router-dom";
import { hotels } from "../lib/data";
import { API } from "../lib/api-index";
import { FaCaretDown } from "react-icons/fa";
import { FaForward } from "react-icons/fa";

const Hotel = () => {
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState("");
  const [hotelPhone, setHotelPhone] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [confirmationNum, setConfirmationNum] = useState("");
  const [error, setError] = useState("");
  const { token, fetchReservations, setReservations, trips } =
    useOutletContext();
  const { tripId } = useParams();

  const today = format(new Date(), "yyyy-MM-dd");

  // Calculate max check-out date based on selected check-in date
  const maxCheckOutDate = checkIn
    ? format(addDays(new Date(checkIn), 14), "yyyy-MM-dd")
    : today;

  const selectedTrip = trips.find((trip) => trip.id === tripId);

  if (!selectedTrip) {
    return;
  }

  const selectedDestination = selectedTrip.location
    .replace(/_/g, " ") ///_/g stands for global, replaces all occurences of underscore
    .toLowerCase();

  const filteredHotels = hotels.filter(
    (hotel) => hotel.destination.toLowerCase() === selectedDestination,
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!checkIn || !checkOut || !hotelName || !hotelLocation) {
      setError("Please select hotel, dates, and location.");
      return;
    }

    //condition to check if checkin date is before checkout date
    if (checkIn > checkOut) {
      setError("Check-in date must be before check-out date.");
      return;
    }
    // Convert checkIn and checkOut dates to ISO-8601 format
    const isoCheckIn = new Date(checkIn).toISOString();
    const isoCheckOut = new Date(checkOut).toISOString();

    const res = await fetch(`${API}/reservations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotelName,
        hotelPhone,
        hotelLocation,
        departureDate: isoCheckIn,
        arrivalDate: isoCheckOut,
        bookingConfirmation: confirmationNum,
        tripId,
      }),
    });

    const info = await res.json();

    if (!info.success) {
      setError(info.error);
    } else {
      fetchReservations();
      // Navigate to the home page
      navigate(`/car/${tripId}`);
    }
  }

  return (
    <section
      className="reservation-container"
      style={{
        display: "flex",
        backgroundImage: `url(${Map})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form onSubmit={handleSubmit} className="reservation-wrapper flex-col">
        <div className="reservation-text">
          <img src={ReservationIcon} alt="reservation icon" />
          <h2>Enter Hotel / Apartment Reservation</h2>
        </div>
        <div className="input-wrapper">
          <label htmlFor="bookingConfirmation">Booking Confirmation</label>
          <input
            type="text"
            id="bookingConfirmation"
            name="bookingConfirmation"
            className="input-field"
            placeholder="Optional"
            value={confirmationNum}
            onChange={(e) => setConfirmationNum(e.target.value)}
          />
          <div className="field-container">
            <div className="flex-col-start">
              <label htmlFor="hotelName">Hotel Name</label>
              <div className="select-container">
                <select
                  type="text"
                  id="hotelName"
                  name="hotelName"
                  placeholder="Enter the hotel name"
                  className="select-box"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                >
                  <option value="" disabled>
                    Select a hotel
                  </option>
                  {filteredHotels.map((hotel, index) => {
                    return (
                      <option key={index} value={hotel.name}>
                        {hotel.name}
                      </option>
                    );
                  })}
                </select>
                <div className="icon-container">
                  <FaCaretDown />
                </div>
              </div>
            </div>
            <div className="flex-col-start">
              <label htmlFor="hotelPhone">Hotel Phone</label>
              <input
                type="text"
                id="hotelPhone"
                name="hotelPhone"
                placeholder="Optional"
                className="input-field"
                value={hotelPhone}
                onChange={(e) => setHotelPhone(e.target.value)}
              />
            </div>
          </div>
          <label htmlFor="location">Location</label>
          <div className="select-container">
            <select
              type="text"
              id="location"
              name="location"
              placeholder="Enter the location"
              className="select-box"
              value={hotelLocation}
              onChange={(e) => setHotelLocation(e.target.value)}
            >
              <option value="" disabled>
                Select an hotel location
              </option>
              {filteredHotels.map((hotel, index) => {
                return (
                  <option key={index} value={hotel.location}>
                    {hotel.location}
                  </option>
                );
              })}
            </select>
            <div className="icon-container">
              <FaCaretDown />
            </div>
          </div>
          <div className="date-range">
            <div className="checkinDate-container flex-col-start">
              <label htmlFor="checkInDate">Check-in Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  className="date-time-field"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
            </div>
            <div className="checkOutDate-container flex-col-start">
              <label htmlFor="checkOutDate">Check-out Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  className="date-time-field"
                  min={checkIn || today}
                  max={maxCheckOutDate}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="reservation-buttons-container">
          <button
            className="save-button"
            type="submit"
            style={{ filter: "none" }}
          >
            Save
          </button>
          <Link to={`/car/${tripId}`}>
            <button className="next-button">
              <FaForward style={{ marginRight: "5px" }} />
              Skip
            </button>
          </Link>
        </div>
        {error && <p className="error-message flex">{error}</p>}
      </form>
    </section>
  );
};

export default Hotel;
