import React from "react";

type Player = "X" | "O" | "BOTH" | null;

interface Props {
  value: Player;
  onClick: () => void;
  winner: Player;
}

const Square: React.FC<Props> = ({ value, onClick, winner }) => {
  if (!value) {
    return <button onClick={onClick} disabled={Boolean(winner)} className="square" />;
  }
  return <button disabled className={`square square_${value.toLocaleLowerCase()}`}>{value}</button>;
};

export default Square;
