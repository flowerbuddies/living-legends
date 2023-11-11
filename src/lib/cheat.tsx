import { PlayerInfo } from './playerInfo';

export default function Cheat(props: {
  player: PlayerInfo;
  setPlayer: (player: PlayerInfo) => void;
}) {
  const { player, setPlayer } = props;

  return (
    <div>
      <button
        onClick={() => setPlayer({ ...player, health: player.health + 10 })}
      >
        +10 HP
      </button>
    </div>
  );
}
