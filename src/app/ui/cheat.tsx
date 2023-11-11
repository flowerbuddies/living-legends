'use client';

import { useEffect, useState } from 'react';
import { PlayerInfo } from '../../lib/player';
import { clamp } from '../../lib/utils';

export default function Cheat(props: { id: number }) {
  const [player, setPlayer] = useState<PlayerInfo>();
  const [sleep, setSleep] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);

  useEffect(() => {
    fetch(`/api/player?id=${props.id}`)
      .then((res) => res.json())
      .then((player: any) => {
        setPlayer(player);
        setSleep(player.lastNightSleep);
        setSteps(player.last12hSteps);
      });
  }, []);

  function updatePlayer() {
    if (!player || !steps || !sleep) return;
    const healthToRecover = Math.round(player.maxHealth * (sleep / 8));
    let additionalSkillPoints = clamp(Math.round(steps / 1_000), 0, 10);

    fetch(`/api/player?id=${props.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...player,
        lastNightSleep: sleep,
        last12hSteps: steps,
        health: clamp(player.health + healthToRecover, 0, player.maxHealth),
        skillPoints: player.skillPoints + additionalSkillPoints,
      }),
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
