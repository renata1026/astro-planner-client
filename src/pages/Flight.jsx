import React from "react";
import ReservationIcon from "@/assets/hotelTwo.svg";
import Map from "@/assets/travel-pic.jpg";
import { useState } from "react";
import { API } from "@/lib/api-index";
import {
  useOutletContext,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { flights } from "@/lib/data";
import { FaCaretDown } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { format, addDays, isAfter } from "date-fns";

const Flight = ({ destination }) => {
  const navigate = useNavigate();
  const [airlineConNum, setAirlineConNum] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [error, setError] = useState("");
  const [minArrivalDate, setMinArrivalDate] = useState("");
  const [maxArrivalDate, setMaxArrivalDate] = useState("");
  const { token, fetchReservations, setReservations, trips } =
    useOutletContext();
  const { tripId } = useParams();

  const today = format(new Date(), "yyyy-MM-dd");

  const selectedTrip = trips.find((trip) => trip.id === tripId);

  if (!selectedTrip) {
    return;
  }

  const selectedDestination = selectedTrip.location
    .replace(/_/g, " ") ///_/g stands for global, replaces all occurrences of underscore
    .toLowerCase();

  const filteredFlights = flights.filter(
    (flight) => flight.destination.toLowerCase() === selectedDestination,
  );

  //new Set used to store unique values, with no duplicates
  const uniqueArrivalAirports = [
    ...new Set(filteredFlights.map((flight) => flight.arrivalAirport)),
  ];

  const handleDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);

    const selectedDate = addDays(new Date(e.target.value), 1);
    const nextDay = selectedDate.toISOString().split("T")[0];

    setMinArrivalDate(e.target.value);
    setMaxArrivalDate(nextDay);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (
      !departureAirport ||
      !arrivalAirport ||
      !departureDate ||
      !arrivalDate
    ) {
      setError("Please select airline, dates, departure and arrival airports.");
      return;
    }

    //condition to check if departure date is before arrival date
    if (isAfter(new Date(departureDate), new Date(arrivalDate))) {
      setError("Departure date must be before arrival date.");
      return;
    }
    // Convert checkIn and checkOut dates to ISO-8601 format
    const isoCheckIn = new Date(arrivalDate + "T00:00:00Z").toISOString();
    const isoCheckOut = new Date(departureDate + "T00:00:00Z").toISOString();

    const res = await fetch(`${API}/reservations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departureAirport,
        arrivalAirport,
        departureDate: isoCheckIn,
        arrivalDate: isoCheckOut,
        airlineName,
        flightNumber,
        bookingConfirmation: airlineConNum,
        tripId,
      }),
    });

    const info = await res.json();

    if (!info.success) {
      setError(info.error);
    } else {
      fetchReservations();

      // Navigate to the home page
      navigate(`/hotel/${tripId}`);
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
            value={airlineConNum}
            onChange={(e) => setAirlineConNum(e.target.value)}
          />
          <div className="field-container">
            <div className="flex-col-start">
              <label htmlFor="airlineName">Airline</label>
              <div className="select-container">
                <select
                  type="text"
                  id="airlineName"
                  name="airlineName"
                  placeholder="Enter an airline"
                  className="select-box"
                  value={airlineName}
                  onChange={(e) => setAirlineName(e.target.value)}
                >
                  <option value="" disabled>
                    Select a flight
                  </option>

                  {filteredFlights.map((flight, index) => {
                    return (
                      <option key={index} value={flight.airlineName}>
                        {flight.airlineName}
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
              <label htmlFor="flightNum">Flight Number</label>
              <input
                type="text"
                id="flightNum"
                name="flightNum"
                placeholder="Optional"
                className="input-field"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              />
            </div>
          </div>
          <label htmlFor="departureAirport">Departure Airport</label>
          <div className="select-container">
            <select
              type="text"
              id="departureAirport"
              name="departureAirport"
              placeholder="Entering Depart Airport"
              className="select-box"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
            >
              <option value="" disabled>
                Select a Departure Airport
              </option>
              {filteredFlights.map((flight, index) => {
                return (
                  <option key={index} value={flight.departureAirport}>
                    {flight.departureAirport}
                  </option>
                );
              })}
            </select>
            <div className="icon-container">
              <FaCaretDown />
            </div>
          </div>
          <label htmlFor="arrivalAirport">Arrival Airport</label>
          <div className="select-container">
            <select
              type="text"
              id="arrivalAirport"
              name="arrivalAirport"
              placeholder="Entering Arrival Airport"
              className="select-box"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            >
              <option value="" disabled>
                Select a Arrival Airport
              </option>
              {uniqueArrivalAirports.map((airport, index) => {
                return (
                  <option key={index} value={airport}>
                    {airport}
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
              <label htmlFor="departureDate">Departure Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  className="date-time-field"
                  value={departureDate}
                  min={today}
                  onChange={handleDepartureDateChange}
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
                  value={arrivalDate}
                  min={minArrivalDate}
                  max={maxArrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
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
          <Link to={`/hotel/${tripId}`}>
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

export default Flight;
