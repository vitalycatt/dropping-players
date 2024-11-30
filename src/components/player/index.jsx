import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

export const Player = ({ player }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PLAYER",
    item: player,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-4 p-3 mb-3 border rounded-lg cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <img
        src={player.photo}
        alt={`${player.firstName} ${player.lastName}`}
        className="w-12 h-12 rounded-full"
      />
      <div className="text-left">
        <p className="font-bold">{player.number}</p>
        <p>{`${player.firstName} ${player.lastName}`}</p>
      </div>
    </div>
  );
};

Player.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};
