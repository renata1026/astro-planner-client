import React, { useState } from "react";

const NextButton = () => {
  const [next, setNext] = useState(0);

  const handleClick = () => {
    if (next === -1) {
      setNext(0);
    } else {
      setNext(next + 1);
    }
  };

  return (
    <div>{next !== -1 && <button onClick={handleClick}>Next</button>}</div>
  );
};

export default NextButton;
