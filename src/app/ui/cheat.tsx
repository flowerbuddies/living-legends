'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PlayerInfo } from '../../lib/player';
import { clamp } from '../../lib/utils';

export default function Cheat(props: {
  id: number;
  skill: [number, Dispatch<SetStateAction<number>>];
}) {
  const [player, setPlayer] = useState<PlayerInfo>();
  const [sleep, setSleep] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);
  const [skillPoints, setSkillPoints] = props.skill;

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
    setSkillPoints(player.skillPoints + additionalSkillPoints);
  }

  return (
    <div className='border-8 border-red bg-white'>
      <h3 className='text-red text-xl font-bold text-center'>
        IRL Activity Simulator
      </h3>
      <div className='flex w-screen text-white justify-evenly my-4'>
        <div className='flex flex-col items-center'>
          <h3 className='text-green font-bold text-xl bg-white border-4 border-b-0 rounded-t-xl border-green p-1'>
            Sleep
          </h3>
          <input
            type='text'
            value={sleep}
            className='w-20 border-4 border-green rounded-lg text-black text-center font-semibold'
            onChange={(e) => setSleep(Number(e.target.value))}
          />
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='text-green font-bold text-xl bg-white border-4 border-b-0 rounded-t-xl border-green p-1'>
            Steps
          </h3>
          <input
            type='text'
            value={steps}
            className='w-20 border-4 border-green rounded-lg text-black text-center font-semibold'
            onChange={(e) => setSteps(Number(e.target.value))}
          />
        </div>
        <button
          className='border-4 border-green rounded-2xl p-2 bg-white text-green font-bold text-xl'
          onClick={() => updatePlayer()}
        >
          Next Day
        </button>
      </div>
    </div>
  );
}
