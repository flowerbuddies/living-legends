'use client';

import Cheat from './ui/cheat';
import HealthBar from './ui/healthbar';
import Actions from './ui/actions';
import { useEffect, useState } from 'react';
import bg from '../../public/assets/environments/clearing.png';
import Image from 'next/image';
import Character from './ui/character';
import { PlayerInfo } from '@/lib/player';

export default function Home() {
  const [id, setId] = useState(-1);
  const [skillPoints, setSkillPoints] = useState(0);

  let ran = false;

  useEffect(() => {
    if (ran) return;
    ran = true;
    fetch(`/api/player?id=${id}`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Player ' + id,
        health: 100,
        maxHealth: 100,
        attackModifier: 10,
        blockAmount: 10,
        skillPoints: 3,
        lastNightSleep: 8,
        last12hSteps: 2300,
      } as PlayerInfo),
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (id === -1) setId(res.id);
      });
  }, []);

  return (
    <main>
      <Image
        src={bg}
        alt='background'
        className='absolute top-0 left-1/2 -translate-x-1/2 w-[393px] h-screen overflow-x-hidden object-cover -z-10'
      />
      {id !== -1 && (
        <>
          <Cheat id={id} skill={[skillPoints, setSkillPoints]} />
          <HealthBar id={id} />
          <Character id={id} skill={[skillPoints, setSkillPoints]} />
          <Actions id={id} />
        </>
      )}
    </main>
  );
}
