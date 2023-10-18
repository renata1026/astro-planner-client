import { FiChevronDown } from "react-icons/fi";
import { LuHotel } from "react-icons/lu";
import { AiOutlineCar } from "react-icons/ai";
import { BsAirplane } from "react-icons/bs";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const StaggeredDropDown = ({ tripId }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <motion.div animate={open ? "open" : "closed"} className="dropdown">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="dropdown-toggle"
        >
          <span className="toggle-text">Add Bookings</span>
          <motion.span variants={iconVariants} className="toggle-icon">
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          className="dropdown-menu"
        >
          <Option
            setOpen={setOpen}
            Icon={LuHotel}
            text="Hotel"
            reservationType="hotel"
            tripId={tripId}
          />
          <Option
            setOpen={setOpen}
            Icon={BsAirplane}
            text="Flight"
            reservationType="flight"
            tripId={tripId}
          />
          <Option
            setOpen={setOpen}
            Icon={AiOutlineCar}
            text="Car"
            reservationType="car"
            tripId={tripId}
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen, reservationType, tripId }) => {
  console.log("tripId", tripId);
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="dropdown-item"
    >
      <Link to={`/${reservationType}/${tripId}`} className="dropdown-link">
        <motion.span variants={actionIconVariants} className="item-icon">
          <Icon />
        </motion.span>
        <span className="item-text">{text}</span>
      </Link>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
