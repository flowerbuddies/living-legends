import { Dispatch, SetStateAction, useState } from 'react';
import { PlayerInfo } from '../../lib/playerInfo';
import { clamp } from '../../lib/utils';

export default function Cheat(props: {
  player: PlayerInfo;
  setPlayer: Dispatch<SetStateAction<PlayerInfo>>;
}) {
  const { player, setPlayer } = props;
  const [sleep, setSleep] = useState(player.lastNightSleep);
  const [steps, setSteps] = useState(player.last12hSteps);

  function updatePlayer() {
    const healthToRecover = Math.round(player.maxHealth * (sleep / 8));
    let additionalSkillPoints = clamp(Math.round(steps / 1_000), 0, 10);

    setPlayer({
      ...player,
      lastNightSleep: sleep,
      last12hSteps: steps,
      health: clamp(player.health + healthToRecover, 0, player.maxHealth),
      skillPoints: player.skillPoints + additionalSkillPoints,
    });
  }

  return (
    <div className='flex'>
      <div>
        <h3>Sleep</h3>
        <input
          type='text'
          value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
        />
      </div>
      <div>
        <h3>Steps</h3>
        <input
          type='text'
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
        />
      </div>
      <button onClick={() => updatePlayer()}>Next Day</button>
    </div>
  );
}
