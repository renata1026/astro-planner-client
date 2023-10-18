import React, { useEffect } from "react";
import { useState } from "react";
import ReservationIcon from "@/assets/hotelTwo.svg";
import Map from "@/assets/travel-pic.jpg";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { cars } from "@/lib/data";
import { API } from "@/lib/api-index";
import { FaCaretDown } from "react-icons/fa";

const Car = () => {
  const { reservationId } = useParams();
  const { reservations, trips, token, fetchReservations } = useOutletContext();
  const navigate = useNavigate();
  const [confirmationNum, setConfirmationNum] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [carType, setCarType] = useState("");
  const [pickupLocation, setPickUpLocation] = useState("");
  const [dropoffLocation, setDropOffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [error, setError] = useState("");

  const reservation = reservations.find(
    (reservation) => reservation.id === reservationId,
  );

  const tripId = reservation?.tripId;
  const selectedTrip = trips.find((trip) => trip.id === tripId);

  const selectedDestination = selectedTrip?.location
    .replace(/_/g, " ") ///_/g for global, replaces all occurences of underscore
    .toLowerCase();

  const filteredCars = cars.filter(
    (car) => car.city.toLowerCase() === selectedDestination,
  );

  useEffect(() => {
    const foundReservation = reservations.find(
      (reservation) => reservation.id === reservationId,
    );

    const currentDate = new Date().toISOString().split("T")[0]; // Default to current date

    const formattedCheckIn = foundReservation?.pickupDate?.split("T")[0];
    const formattedCheckOut = foundReservation?.dropoffDate?.split("T")[0];

    setAgencyName(foundReservation?.agencyName || "");
    setPickUpLocation(foundReservation?.pickupLocation || "");
    setDropOffLocation(foundReservation?.dropoffLocation || "");
    setPickupDate(formattedCheckIn || currentDate);
    setDropoffDate(formattedCheckOut || currentDate);
  }, [reservations, reservationId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!agencyName || !carType || !pickupDate || !dropoffDate) {
      setError(
        "Please select an agency name, car type, pick-up and drop-off date.",
      );
      return;
    }

    //condition to check if checkIn date is before checkout date
    if (pickupDate > dropoffDate) {
      setError("Pickup date must be before drop-off date.");
      return;
    }
    // Convert checkIn and checkOut dates to ISO-8601 format
    const isoPickUp = new Date(pickupDate).toISOString();
    const isoDropOff = new Date(dropoffDate).toISOString();

    const res = await fetch(`${API}/reservations/${reservationId}`, {
      method: "PUT",
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
          <div className="field-container">
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
                  <option value="">Select a car agency</option>
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
                  <option value="">Select car type</option>
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
          <select
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            className="input-field"
            placeholder="Enter the pick-up location"
            value={pickupLocation}
            onChange={(e) => setPickUpLocation(e.target.value)}
          >
            <option value="">Select a Pick-up Location</option>
            {filteredCars.map((car, index) => {
              return (
                <option key={index} value={car.pickupLocation}>
                  {car.pickupLocation}
                </option>
              );
            })}
          </select>
          <label htmlFor="dropoffLocation">Drop-off Location</label>
          <select
            type="text"
            id="dropoffLocation"
            name="dropoffLocation"
            placeholder="Enter the drop-off location"
            className="input-field"
            value={dropoffLocation}
            onChange={(e) => setDropOffLocation(e.target.value)}
          >
            <option value="">Select a drop-off Location</option>
            {filteredCars.map((car, index) => {
              return (
                <option key={index} value={car.dropoffLocation}>
                  {car.dropoffLocation}
                </option>
              );
            })}
          </select>
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
                  onChange={(e) => setDropoffDate(e.target.value)}
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

export default Car;
