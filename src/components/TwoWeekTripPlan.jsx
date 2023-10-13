import { LuNetwork } from 'react-icons/lu';
import { BsCalendarRange } from 'react-icons/bs';
import { VscChecklist } from 'react-icons/vsc';
import { BiHomeAlt } from 'react-icons/bi';

import avatar1 from '@/assets/avatar1.png';
import avatar2 from '@/assets/avatar2.png';
import avatar3 from '@/assets/avatar3.png';
import avatar4 from '@/assets/avatar4.png';

const cardItems = [
  {
    Icon: <LuNetwork className="card-icon" />,
    title: 'Check Your Route',
    image: avatar1,
    personName: 'Rebecca',
    infoChip: '13 days, 6 hours',
    buttonText: 'Check Now',
  },
  {
    Icon: <BsCalendarRange className="card-icon" />,
    title: 'Set Day by Day Plan',
    image: avatar2,
    personName: 'Coleman',
    infoChip: 'day by day',
    buttonText: 'Check Now',
  },
  {
    Icon: <VscChecklist className="card-icon" />,
    title: 'Choose the Checklist',
    image: avatar3,
    personName: 'Kermit',
    infoChip: '1 day full view',
    buttonText: 'Check Now',
  },
  {
    Icon: <BiHomeAlt className="card-icon" />,
    title: 'Specify Where to Stay',
    image: avatar4,
    personName: 'Seth',
    infoChip: 'hotel view',
    buttonText: 'Check Now',
  },
];

const TwoWeekTripPlan = () => {
  return (
    <section className="two-week-trip-section">
      <div className="trip-plan-container">
        <div className="trip-plan-content">
          <h2 className="trip-plan-title">
            <div>Ready for 14 days</div>
            <div>Trip Plan</div>
          </h2>
          <p className="trip-plan-description">
            <span>
              The secret of good trip planning is to plan in advance, and we
            </span>
            <span>can't get much more advanced than 14 days.</span>
          </p>
          <button className="trip-plan-button">Go Plan</button>
        </div>
        <div className="illustration-container">
          <div className="card-container">
            {cardItems.map((item, index) => (
              <div key={index} className="card">
                <div className="icon-container">{item.Icon}</div>
                <div className="card-content-container">
                  <div className="card-info-container">
                    <h3 className="card-title">{item.title}</h3>
                    <div className="user-content-container">
                      <div className="avatar-container">
                        <img
                          src={item.image}
                          alt="avatar"
                          className="card-avatar"
                        />
                        <p className="card-person-name">{item.personName}</p>
                      </div>
                      <span className="card-info-chip">{item.infoChip}</span>
                    </div>
                  </div>
                  <button className="card-button">{item.buttonText}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoWeekTripPlan;
