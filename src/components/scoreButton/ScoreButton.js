import React, { useState } from "react";
import "./ScoreButton.css";

import { Minus, Plus } from "../imports";

const ScoreButton = ({ value, currentUser, postUser, newScore, data }) => {
  const [score, setScore] = useState(newScore);

  const onPlusClick = () => {
    if (currentUser === postUser) return;
    if (data.newScore < value + 1) {
      data.newScore += 1;
      setScore(data.newScore);
    }
  };

  const onMinusClick = () => {
    if (currentUser === postUser) return;
    if (data.newScore > value - 1) {
      data.newScore -= 1;
      setScore(data.newScore);
    }
  };

  return (
    <div
      className="score"
      style={{
        background:
          score > value
            ? "rgba(35, 255, 72, 0.2)"
            : score < value
            ? "rgba(255, 35, 35, 0.2)"
            : "",
      }}
    >
      <div className="score__increment">
        <Plus onClick={onPlusClick} />
      </div>
      <p className="score__value">{score}</p>
      <div className="score__decrement">
        <Minus onClick={onMinusClick} />
      </div>
    </div>
  );
};

export default ScoreButton;
