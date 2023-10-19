import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

const Faq = () => {
  return (
    <div className="basic-faq-container">
      <div className="faq-content">
        <h3 className="faq-header">Frequently asked questions</h3>
        <Question title="What is Astro Planner?" defaultOpen>
          <p>
            Astro Planner is a trip planner that offers a platform for users to
            craft a fully-customized, realistic itinerary for any city and town
            worldwide. When planning a journey, Astro Planner takes into account
            the five major factors influencing trip planning: flights and
            transportation, hotels, attractions and things to do, tours &
            activities, and restaurants.
          </p>
        </Question>
        <Question title="How can I contact you?">
          <p>
            How can I contact you? You can get in touch with our dedicated
            customer support team via the "Contact Us" section on our website.
            Alternatively, you can email us at support@astroplanner.com or call
            us on our toll-free number at 1-800-123-4567. Our team is available
            around the clock to help with any inquiries.
          </p>
        </Question>
        <Question title="When will my credit card be charged?">
          <p>
            As soon as you finalize your itinerary and give the nod for the
            booking, your credit card will be charged right away. An itemized
            invoice will be dispatched to the email address you've provided,
            ensuring total transparency. Do make sure to peruse all the
            specifics before giving your final confirmation.
          </p>
        </Question>
        <Question title="What does my quote include?">
          <p>
            Your Astro Planner quotation offers a thorough breakdown of every
            cost related to your trip. This encompasses airfare, hotel stays,
            local transportation, any tours & activities you've opted for, and
            an approximation for dining. Our commitment is to transparency, so
            rest assured there are no hidden fees. However, do note that
            personal expenditures and any spur-of-the-moment activities aren't
            part of the quote.
          </p>
        </Question>
        <Question title="Are there any specials?">
          <p>
            Of course! Astro Planner is always in tandem with global partners to
            introduce exclusive promotions and offers for our clientele. These
            might include slashed airfares, privileged hotel tariffs, or even
            one-of-a-kind experiences in specific locales. Don't forget to
            frequent the "Specials" segment on our website or become a
            subscriber to our newsletter to remain in the loop about the
            freshest deals!
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
