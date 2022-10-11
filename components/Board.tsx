import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O",
  );
  const [winner, setWinner] = useState(null);

  const setSquareValue = (index: number) => {
    const newData = squares.map((value, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return value;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  return (
    <div>
      <p>Hey {currentPlayer}, it is your turn.</p>
      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                key={i}
                onClick={() => {
                  setSquareValue(i);
                }}
                value={squares[i]}
                winner={winner}
              />
            );
          })}
      </div>
      <button type="reset" onClick={reset} className="reset">
        Reset
      </button>
    </div>
  );
};

export default Board;
