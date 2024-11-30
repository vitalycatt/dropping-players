import { useState } from "react";
import { playersData } from "./data";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Player, PlayerPosition } from "./components";
import "./App.css";
import FootballYardImage from "../src/assets/images/football-yard.jpg";

const App = () => {
  const [players, setPlayers] = useState(playersData);
  const [fieldPositions, setFieldPositions] = useState({});

  const handleDropPlayer = (newPosition, player) => {
    setFieldPositions((prev) => {
      const updatedPositions = { ...prev };

      if (player.currentPosition) {
        delete updatedPositions[player.currentPosition];
      }

      updatedPositions[newPosition] = {
        id: player.id,
        number: player.number,
        firstName: player.firstName,
        lastName: player.lastName,
        photo: player.photo,
      };

      return updatedPositions;
    });

    if (!player.currentPosition) {
      setPlayers((prev) => prev.filter((p) => p.id !== player.id));
    }
  };

  const handleRemovePlayer = (position) => {
    const player = fieldPositions[position];
    if (player) {
      setPlayers((prev) => [...prev, player]);
      setFieldPositions((prev) => {
        const updated = { ...prev };
        delete updated[position];
        return updated;
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-8 p-8">
        <div className="min-w-40">
          <h3 className="text-xl font-bold mb-4">Players</h3>

          {players.map((player) => (
            <Player key={player.id} player={player} />
          ))}
        </div>

        <div className="w-full flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Football yard</h3>

          <div className="relative w-[400px] h-[630px]">
            <img
              src={FootballYardImage}
              alt="football-yard"
              className="absolute top-0 left-0 w-full"
            />

            <div className="p-4 absolute top-0 left-0 z-10 w-full h-full grid grid-cols-2 gap-4">
              {["GK", "LB", "CB", "RB", "CM", "LW", "RW", "ST"].map(
                (position) => (
                  <PlayerPosition
                    key={position}
                    position={position}
                    player={fieldPositions[position]}
                    onDropPlayer={handleDropPlayer}
                    onRemovePlayer={handleRemovePlayer}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
