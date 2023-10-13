import tripImage from '@/assets/trip-image.png';

const CreateTrip = () => {
  return (
    <div style={{ height: '100vh' }} className="container">
      <form className="create-trip-form">
        <div className="col-one">
          <h2>Create Trip</h2>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="City name"
          />
          <label htmlFor="check-in">Check-in</label>
          <div className="flex">
            <input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="Start Date"
            />
            <label htmlFor="check-out">Check-out</label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="End Date"
            />
          </div>
          <label htmlFor="travellers">Travellers</label>
          <input
            type="text"
            name="travellers"
            id="travellers"
            placeholder="Passenger"
          />
          <button className="create-trip-button">Create Trip</button>
        </div>
        <div className="col-two">
          <img src={tripImage} alt="Trip" className="trip-image" />
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
