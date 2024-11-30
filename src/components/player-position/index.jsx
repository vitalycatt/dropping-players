import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";

export const PlayerPosition = ({
  player,
  position,
  onDropPlayer,
  onRemovePlayer,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PLAYER",
    drop: (item) => onDropPlayer(position, item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "PLAYER",
      item: { ...player, currentPosition: position },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [player]
  );

  return (
    <div
      ref={drop}
      className={`h-[138px] flex-1 border flex items-center justify-center rounded-lg ${
        isOver ? "bg-green-200" : "bg-white"
      }`}
    >
      {player ? (
        <div
          ref={drag}
          className={`text-center relative ${
            isDragging ? "opacity-50" : "opacity-100"
          }`}
        >
          <img
            src={player.photo}
            alt={player.lastName}
            className="w-12 h-12 rounded-full mx-auto"
          />

          <p className="font-bold text-black/80">{player.number}</p>

          <p className="text-black/80">{player.lastName}</p>

          <button
            onClick={() => onRemovePlayer(position)}
            className="bg-red-500 text-white text-xs flex items-center justify-center h-2 rounded-full"
          >
            Удалить
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">Drop Player Here</p>
      )}
    </div>
  );
};

PlayerPosition.propTypes = {
  position: PropTypes.string.isRequired,
  player: PropTypes.shape({
    id: PropTypes.number,
    number: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photo: PropTypes.string,
  }),
  onDropPlayer: PropTypes.func.isRequired,
  onRemovePlayer: PropTypes.func.isRequired,
};
