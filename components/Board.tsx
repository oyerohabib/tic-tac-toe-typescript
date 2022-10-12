import React, { useState, useEffect } from "react";
import Square from "./Square";

type Player = "X" | "O" | "BOTH" | null;

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">();
  const [winner, setWinner] = useState<Player>(null);

  useEffect(() => {
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  }, []);

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

  const determineWinner = (squares: Player[]) => {
    const winningOptions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningOptions.length; i++) {
      const [a, b, c] = winningOptions[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const w = determineWinner(squares);

    if (w) {
      setWinner(w);
    }
    if (!w && !squares.includes(null)) {
      // !squares.filter((square) => !square).length, alternative for !squares.includes(null)
      setWinner("BOTH");
    }
  }, [squares]);

  return (
    <div className="board-container">
      {!winner && <p>Hey {currentPlayer}, it is your turn.</p>}
      {winner && winner !== "BOTH" && <p>Congratulations {winner}</p>}
      {winner && winner === "BOTH" && <p>That is a draw.</p>}
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
