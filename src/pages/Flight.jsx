import React from "react";
import ReservationIcon from "@/assets/hotelTwo.svg";
import Map from "@/assets/travel-pic.jpg";
import { useState } from "react";
import { API } from "../lib/api-index";
import { useOutletContext, useNavigate } from "react-router-dom";
import { flights } from "../lib/data";

const Flight = () => {
  const navigate = useNavigate();
  const [airlineConNum, setAirlineConNum] = useState("");
  const [airline, setAirline] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [error, setError] = useState("");

  const { token, fetchReservations } = useOutletContext();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (
      !departureAirport ||
      !arrivalAirport ||
      !departureDate ||
      !arrivalDate
    ) {
      setError("Please select a destination."); // Display an error if no destination is selected
      return;
    }
    // Convert checkIn and checkOut dates to ISO-8601 format
    const isoCheckIn = new Date(departureDate).toISOString();
    const isoCheckOut = new Date(arrivalDate).toISOString();

    const res = await fetch(`${API}/reservations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departure: departureAirport,
        arrival: arrivalAirport,
        departureDate: isoCheckIn,
        arrivalDate: isoCheckOut,
        airline: airlineName,
        flightNumber,
        airlineConNum: bookingConfirmation,
      }),
    });

    const info = await res.json();
    console.log(info);

    if (!info.success) {
      setError(info.error);
    } else {
      fetchReservations();
      // Navigate to the home page
      navigate("/hotel");
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
      <form className="reservation-wrapper flex-col">
        <div className="reservation-text">
          <img src={ReservationIcon} alt="reservation icon" />
          <h2>Enter Flight Reservation</h2>
        </div>
        <div className="input-wrapper">
          <label htmlFor="bookingConfirmation">Airline Confirmation</label>
          <input
            type="text"
            id="bookingConfirmation"
            name="bookingConfirmation"
            className="input-field"
            placeholder="Optional"
          />
          <div className="field-container">
            <div className="flex-col-start">
              <label htmlFor="airlineName">Airline</label>
              <select
                type="text"
                id="airline"
                name="airline"
                placeholder="Enter an airline"
                className="input-field"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
              >
                <option value="">Select a flight</option>
                {flights.map((flight) => {
                  return (
                    <option key={flight} value={flight}>
                      {flight.airline}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex-col-start">
              <label htmlFor="flightNum">Flight Number</label>
              <input
                type="text"
                id="flightNum"
                name="flightNum"
                placeholder="Optional"
                className="input-field"
              />
            </div>
          </div>
          <label htmlFor="departureAirport">Departure Airport</label>
          <select
            type="text"
            id="departureAirport"
            name="departureAirport"
            placeholder="Entering Depart Airport"
            className="input-field"
            value={departureAirport}
            onChange={(e) => setDepartureAirport(e.target.value)}
          >
            <option value="">Select a Departure Airport</option>
            {flights.map((flight) => {
              return (
                <option key={flight} value={flight}>
                  {flight.departureAirport}
                </option>
              );
            })}
          </select>
          <label htmlFor="arrivalAirport">Arrival Airport</label>
          <select
            type="text"
            id="arrivalAirport"
            name="arrivalAirport"
            placeholder="Entering Arrival Airport"
            className="input-field"
            value={arrivalAirport}
            onChange={(e) => setArrivalAirport(e.target.value)}
          >
            <option value="">Select a Arrival Airport</option>
            {flights.map((flight) => {
              return (
                <option key={flight} value={flight}>
                  {flight.arrivalAirport}
                </option>
              );
            })}
          </select>
          <div className="date-range">
            <div className="checkinDate-container flex-col-start">
              <label htmlFor="departureDate">Departure Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  className="date-time-field"
                />
                <input
                  type="time"
                  id="checkInTime"
                  name="checkInTime"
                  className="date-time-field"
                />
              </div>
            </div>
            <div className="checkOutDate-container flex-col-start">
              <label htmlFor="arrivalDate">Arrival Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="arrivalDate"
                  name="arrivalDate"
                  className="date-time-field"
                />
                <input
                  type="time"
                  id="checkOutTime"
                  name="checkOutTime"
                  className="date-time-field"
                />
              </div>
            </div>
          </div>
          <div className="center">
            <button
              className="save-button"
              type="submit"
              style={{ filter: "none" }}
            >
              Save
            </button>
          </div>
        </div>
        {error && <p className="error-message flex">{error}</p>}
      </form>
    </section>
  );
};

export default Flight;
