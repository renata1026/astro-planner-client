import React from 'react';
import ReservationIcon from '@/assets/hotelTwo.svg';
import Map from '@/assets/travel-pic.jpg';

const Flight = () => {
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
              <label htmlFor="hotelName">Airline</label>
              <input
                type="text"
                id="hotelName"
                name="hotelName"
                placeholder="Enter an airline"
                className="input-field"
              />
            </div>
            <div className="flex-col-start">
              <label htmlFor="hotelPhone">Flight</label>
              <input
                type="text"
                id="hotelPhone"
                name="hotelPhone"
                placeholder="Optional"
                className="input-field"
              />
            </div>
          </div>
          <label htmlFor="location">Depart Airport</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Entering Depart Airport"
            className="input-field"
          />
          <label htmlFor="location">Arrival Airport</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Entering Arrival Airport"
            className="input-field"
          />
          <div className="date-range">
            <div className="checkinDate-container flex-col-start">
              <label htmlFor="checkInDate">Depart Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
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
              <label htmlFor="checkOutDate">Arrival Date</label>
              <div className="reservation-flex">
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
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

export default Flight;
