import tripImage from "@/assets/trip-image.png";
import { useState } from "react";
import { API } from "../lib/api-index";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Location } from "../lib/data";
import { FaCaretDown } from "react-icons/fa";
import { toTitleCase } from "../lib/helper";
import { format, addDays, isBefore, parseISO } from "date-fns";

// Function to get today's date in the format YYYY-MM-DD
function getTodayDate() {
  return format(new Date(), "yyyy-MM-dd");
}

// Function to get tomorrow's date in the format YYYY-MM-DD
function getTomorrowDate() {
  return format(addDays(new Date(), 1), "yyyy-MM-dd");
}

const CreateTrip = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(getTodayDate());
  const [checkOut, setCheckOut] = useState(getTomorrowDate());
  const [error, setError] = useState("");
  const [passengers, setPassengers] = useState(1);

  const { token, fetchTrips } = useOutletContext();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!destination) {
      setError("Please select a destination."); // Display an error if no destination is selected
      return;
    }

    console.log(destination);

    // condition to check if check-in date is before checkout date
    if (isBefore(parseISO(checkOut), parseISO(checkIn))) {
      setError("Check-in date must be before check-out date.");
      return;
    }

    // Convert checkIn and checkOut dates to full ISO-8601 DateTime format
    const fullISOCheckIn = `${checkIn}T00:00:00.000Z`;
    const fullISOCheckOut = `${checkOut}T00:00:00.000Z`;

    // Convert passengers from a string to an integer
    const passengersInt = parseInt(passengers, 10);

    const res = await fetch(`${API}/trips`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: destination,
        checkIn: fullISOCheckIn,
        checkOut: fullISOCheckOut,
        passengers: passengersInt,
      }),
    });

    const info = await res.json();

    if (!info.success) {
      setError(info.error);
    } else {
      fetchTrips();
      const tripId = info.trip.id;
      // Navigate to the home page
      navigate(`/flight/${tripId}`);
    }
  }

  return (
    <div className="create-trip-container">
      <form onSubmit={handleSubmit} className="create-trip-form">
        <div className="col-one">
          <h2>Create Trip</h2>
          <label htmlFor="location">Destination</label>
          <div className="select-container">
            <select
              type="text"
              name="location"
              id="location"
              placeholder="City name"
              className="select-box"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="" disabled>
                Select a Destination
              </option>
              {Location.map((city) => {
                return (
                  <option key={city} value={city}>
                    {toTitleCase(city)}
                  </option>
                );
              })}
            </select>
            <div className="icon-container">
              <FaCaretDown />
            </div>
          </div>
          <label htmlFor="check-in">Check-in</label>
          <div className="flex">
            <input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="Start Date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                // If checkOut is before checkIn, reset checkOut to checkIn
                if (e.target.value > checkOut) {
                  setCheckOut(e.target.value);
                }
              }}
              min={getTodayDate()} // Disable past dates
            />
            <label htmlFor="check-out">Check-out</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="End Date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn} // Disable dates before the checkIn date
            />
          </div>
          <label htmlFor="travellers">Travellers</label>
          <input
            type="text"
            name="travellers"
            id="travellers"
            placeholder="Passenger"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          />
          <button type="submit" className="create-trip-button">
            Create Trip
          </button>
        </div>
        <div className="col-two">
          <img src={tripImage} alt="Trip" className="trip-image" />
          {error && <p className="error-message flex">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
