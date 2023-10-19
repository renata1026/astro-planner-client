import React from "react";
import { useState } from "react";
import ReservationIcon from "@/assets/hotelTwo.svg";
import Map from "@/assets/travel-pic.jpg";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { cars } from "../lib/data";
import { API } from "../lib/api-index";
import { FaCaretDown } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { format, addWeeks, isBefore, formatISO } from "date-fns";

const Car = () => {
  const navigate = useNavigate();
  const [confirmationNum, setConfirmationNum] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [carType, setCarType] = useState("");
  const [pickupLocation, setPickUpLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [error, setError] = useState("");
  const { token, fetchReservations, setReservations, trips } =
    useOutletContext();
  const { tripId } = useParams();

  const today = format(new Date(), "yyyy-MM-dd");
  let twoWeeksFromPickup = today;
  if (pickupDate) {
    twoWeeksFromPickup = format(
      addWeeks(new Date(pickupDate), 2),
      "yyyy-MM-dd",
    );
  }

  const selectedTrip = trips.find((trip) => trip.id === tripId);

  if (!selectedTrip) {
    return;
  }

  const selectedDestination = selectedTrip.location
    .replace(/_/g, " ") ///_/g for global, replaces all occurrences of underscore
    .toLowerCase();

  const filteredCars = cars.filter(
    (car) => car.city.toLowerCase() === selectedDestination,
  );

  //creates array that contains pick-up/drop-off locations based on filtered cars
  //Set: built-in JS data structure, stores unique values and automatically removes duplicates
  //... spread operator
  const uniquePickupLocation = [
    ...new Set(filteredCars.map((car) => car.pickupLocation)),
  ];

  const uniqueDropoffLocation = [
    ...new Set(filteredCars.map((car) => car.dropoffLocation)),
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // Update the condition to also check if the selected dates are not in the past
    if (
      isBefore(new Date(pickupDate), new Date(today)) ||
      isBefore(new Date(dropoffDate), new Date(today))
    ) {
      setError("Selected date cannot be in the past.");
      return;
    }

    // Update the condition to also check if the selected dates are not in the past
    if (
      isBefore(new Date(pickupDate), new Date(today)) ||
      isBefore(new Date(dropoffDate), new Date(today))
    ) {
      setError("Selected date cannot be in the past.");
      return;
    }

    // Convert checkIn and checkOut dates to ISO-8601 format
    const isoPickUp = formatISO(new Date(pickupDate), {
      representation: "date",
    });
    const isoDropOff = formatISO(new Date(dropoffDate), {
      representation: "date",
    });

    const res = await fetch(`${API}/reservations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingConfirmation: confirmationNum,
        carRentalAgency: agencyName,
        carType,
        pickupLocation,
        dropoffLocation,
        departureDate: isoPickUp,
        arrivalDate: isoDropOff,
        tripId,
      }),
    });

    const info = await res.json();

    if (!info.success) {
      setError(info.error);
    } else {
      // setReservations((prevReservations) => ({
      //   ...prevReservations,
      //   cars: [...prevReservations.cars, info.data.reservation],
      // }));
      fetchReservations();
      // Navigate to the confirmation page
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
      <form onSubmit={handleSubmit} className="reservation-wrapper flex-col">
        <div className="reservation-text">
          <img src={ReservationIcon} alt="reservation icon" />
          <h2>Enter Car Reservation</h2>
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
          <div className="field-container agency-car-container">
            <div className="flex-col-start">
              <label htmlFor="agencyName">Agency Name</label>
              <div className="select-container">
                <select
                  type="text"
                  id="agencyName"
                  name="agencyName"
                  placeholder="Enter the agency name"
                  className="select-box"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                >
                  <option value="" disabled>
                    Select a car agency
                  </option>
                  {filteredCars.map((car, index) => {
                    return (
                      <option key={index} value={car.carRentalAgency}>
                        {car.carRentalAgency}
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
              <label htmlFor="carType">Car Type</label>
              <div className="select-container">
                <select
                  type="text"
                  id="carType"
                  name="carType"
                  placeholder="Optional"
                  className="select-box"
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                >
                  <option value="" disabled>
                    Select car type
                  </option>
                  {filteredCars.map((car, index) => {
                    return (
                      <option key={index} value={car.carType}>
                        {car.carType}
                      </option>
                    );
                  })}
                </select>
                <div className="icon-container">
                  <FaCaretDown />
                </div>
              </div>
            </div>
          </div>
          <label htmlFor="pickupLocation">Pick-up Location</label>
          <div className="select-container">
            <select
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              className="input-field"
              placeholder="Enter the pick-up location"
              value={pickupLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
            >
              <option value="" disabled>
                Select a Pick-up Location
              </option>
              {uniquePickupLocation.map((car, index) => {
                return (
                  <option key={index} value={car}>
                    {car}
                  </option>
                );
              })}
            </select>
            <div className="icon-container">
              <FaCaretDown />
            </div>
          </div>
          <label htmlFor="dropoffLocation">Drop-off Location</label>
          <div className="select-container">
            <select
              type="text"
              id="dropoffLocation"
              name="dropoffLocation"
              placeholder="Enter the drop-off location"
              className="input-field"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
            >
              <option value="" disabled>
                Select a drop-off Location
              </option>
              {uniqueDropoffLocation.map((car, index) => {
                return (
                  <option key={index} value={car}>
                    {car}
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
              <label htmlFor="pickupDate">Pick-up Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  className="date-time-field"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
            </div>
            <div className="checkOutDate-container flex-col-start">
              <label htmlFor="dropoffDate">Drop-off Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="dropoffDate"
                  name="dropoffDate"
                  className="date-time-field"
                  value={dropoffDate}
                  min={pickupDate}
                  max={twoWeeksFromPickup}
                  onChange={(e) => setDropoffDate(e.target.value)}
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
          <Link to={`/confirmation/${tripId}`}>
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

export default Car;
