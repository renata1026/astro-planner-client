import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const Faq = () => {
  return (
    <div className="basic-faq-container">
      <div className="faq-content">
        <h3 className="faq-header">Frequently asked questions</h3>
        <Question title="What is Airtrav?" defaultOpen>
          <p>
            Airtrav is a trip planner that offers a platform to plan a
            fully-customized, realistic itinerary for any city and town across
            the world. Whenever you have to plan a trip, you have to take into
            account the major five factors influence your trip planning. These
            factors are- flights and transportation, hotels, attractions and
            things to do, tours & activities and restaurants.
          </p>
        </Question>
        <Question title="How can I contact you?">
          <p>
            You can reach out to our dedicated customer support team through the
            "Contact Us" page on our website. Alternatively, you can send us an
            email at support@airtrav.com or call our toll-free number at
            1-800-123-4567. Our team is available 24/7 to assist you with any
            queries.
          </p>
        </Question>
        <Question title="When will my credit card be charged?">
          <p>
            Once you finalize your itinerary and confirm the booking, your
            credit card will be charged immediately. A detailed invoice will be
            sent to your registered email address, ensuring complete
            transparency. Please ensure you review all details before confirming
            the booking.
          </p>
        </Question>
        <Question title="What does my quote include?">
          <p>
            Your Airtrav quote provides a comprehensive breakdown of all costs
            associated with your trip. This includes flight tickets, hotel
            accommodations, transportation within the destination, any tours &
            activities you've selected, and an estimate for meals. We strive for
            transparency, so there are no hidden charges. However, personal
            expenses and any unplanned activities are not included in the quote.
          </p>
        </Question>
        <Question title="Are there any specials?">
          <p>
            Absolutely! Airtrav constantly collaborates with partners worldwide
            to bring exclusive deals and specials for our users. These can range
            from discounted flight tickets, special hotel rates, or even unique
            experiences in select cities. Make sure to check the "Specials"
            section on our website or subscribe to our newsletter to stay
            updated with the latest offers!
          </p>
        </Question>
      </div>
    </div>
  );
};

const Question = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="question-container"
    >
      <button onClick={() => setOpen((pv) => !pv)} className="question-toggle">
        <motion.span
          variants={{
            open: {
              color: "rgba(3, 6, 23, 0)",
            },
            closed: {
              color: "rgba(3, 6, 23, 1)",
            },
          }}
          className="question-title"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "rgb(124 58 237)",
            },
            closed: {
              rotate: "0deg",
              color: "#030617",
            },
          }}
          transition={{ duration: 0 }}
          className="icon-chevron"
        >
          <FiChevronDown />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="answer-content"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Faq;
