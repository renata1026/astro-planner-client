import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

import ReservationIcon from "@/assets/hotelTwo.svg";
import Map from "@/assets/travel-pic.jpg";
import { API } from "@/lib/api-index";
import { flights } from "@/lib/data";

const FlightReservation = () => {
  const { reservationId } = useParams();
  const { reservations, trips, token, fetchReservations } = useOutletContext();
  const navigate = useNavigate();
  const [airlineConNum, setAirlineConNum] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [error, setError] = useState("");
  // const [selectedAirline, setSelectedAirline] = useState("");

  const reservation = reservations.find(
    (reservation) => reservation.id === reservationId,
  );

  //console.log({ reservations });
  const tripId = reservation?.tripId;
  const trip = trips.find((trip) => trip.id === tripId);

  const selectedDestination = trip?.location
    .replace(/_/g, " ") ///_/g stands for global, replaces all occurences of underscore
    .toLowerCase();

  const filteredFlights = flights.filter(
    (flight) => flight.destination.toLowerCase() === selectedDestination,
  );

  //new Set used to store unique values, with no duplicates
  const uniqueArrivalAirports = [
    ...new Set(filteredFlights.map((flight) => flight.arrivalAirport)),
  ];

  useEffect(() => {
    //console.log("reservation", reservation);

    const foundReservation = reservations.find(
      (reservation) => reservation.id === reservationId,
    );

    const currentDate = new Date().toISOString().split("T")[0]; // Default to current date

    const formattedCheckIn = foundReservation?.arrivalDate?.split("T")[0];
    const formattedCheckOut = foundReservation?.departureDate?.split("T")[0];

    setAirlineName(foundReservation?.airlineName || "");
    setDepartureAirport(foundReservation?.departureAirport || "");
    setArrivalAirport(foundReservation?.arrivalAirport || "");
    setArrivalDate(formattedCheckIn || currentDate);
    setDepartureDate(formattedCheckOut || currentDate);

    // const initialAirline = reservations.find(
    //   (reservation) => reservation.id === reservationId,
    // )?.airlineName;

    // const initialDepartureAirport = reservations.find(
    //   (reservation) => reservation.id === reservationId,
    // )?.departureAirport;

    // const initialArrivalAirport = reservations.find(
    //   (reservation) => reservation.id === reservationId,
    // )?.arrivalAirport;

    // Set the initial value of 'airline' once the data is available
    // if (initialAirline) {
    //   setAirline(initialAirline);
    // }

    // if (initialDepartureAirport) {
    //   setDepartureAirport(initialDepartureAirport);
    // }

    // if (initialArrivalAirport) {
    //   setArrivalAirport(initialArrivalAirport);
    // }
  }, [reservations, reservationId]);

  async function handleEdit(e) {
    e.preventDefault();
    setError(""); // Clear any previous errors
    console.log("departureAirport", departureAirport);
    console.log("arrivalAirport", arrivalAirport);
    console.log("departureDate", departureDate);
    console.log("arrivalDate", arrivalDate);

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
    if (departureDate > arrivalDate) {
      setError("Departure date must be before arrival date.");
      return;
    }
    // Convert checkIn and checkOut dates to ISO-8601 format
    const isoCheckIn = new Date(arrivalDate).toISOString();
    const isoCheckOut = new Date(departureDate).toISOString();

    const res = await fetch(`${API}/reservations/${reservationId}`, {
      method: "PUT",
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
    //console.log(info);

    if (!info.success) {
      setError(info.error);
    } else {
      // setReservations((prevReservations) => ({
      //   ...prevReservations,
      //   flights: [...prevReservations.flights, info.data.reservation],
      // }));
      fetchReservations();

      // Navigate to the home page
      navigate(`/confirmation/${tripId}`);
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
      <form onSubmit={handleEdit} className="reservation-wrapper flex-col">
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
                  id="airline"
                  name="airline"
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
                  onChange={(e) => setDepartureDate(e.target.value)}
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
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
              </div>
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
        {error && <p className="error-message flex">{error}</p>}
      </form>
    </section>
  );
};

export default FlightReservation;
