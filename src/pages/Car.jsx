import React from 'react';
import ReservationIcon from '@/assets/hotelTwo.svg';
import Map from '@/assets/travel-pic.jpg';

const Car = () => {
  return (
    <section
      className="reservation-container"
      style={{
        display: 'flex',
        backgroundImage: `url(${Map})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <form className="reservation-wrapper flex-col">
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
          />
          <div className="field-container">
            <div className="flex-col-start">
              <label htmlFor="agencyName">Agency Name</label>
              <input
                type="text"
                id="agencyName"
                name="agencyName"
                placeholder="Enter the agency name"
                className="input-field" // Apply this class
              />
            </div>
            <div className="flex-col-start">
              <label htmlFor="carType">Car Type</label>
              <input
                type="text"
                id="carType"
                name="carType"
                placeholder="Optional"
                className="input-field" // Apply this class
              />
            </div>
          </div>
          <label htmlFor="pickupLocation">Pick-up Location</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            className="input-field"
            placeholder="Enter the pick-up location"
          />
          <label htmlFor="dropoffLocation">Drop-off Location</label>
          <input
            type="text"
            id="dropoffLocation"
            name="dropoffLocation"
            placeholder="Enter the drop-off location"
            className="input-field" // Apply this class
          />
          <div className="date-range">
            <div className="checkinDate-container flex-col-start">
              <label htmlFor="pickupDate">Pick-up Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  className="date-time-field"
                />
                <input
                  type="time"
                  id="pickupTime"
                  name="pickupTime"
                  className="date-time-field"
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
                />
                <input
                  type="time"
                  id="dropoffTime"
                  name="dropoffTime"
                  className="date-time-field"
                />
              </div>
            </div>
          </div>
          <div className="center">
            <button
              className="save-button"
              type="button"
              style={{ filter: 'none' }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Car;
