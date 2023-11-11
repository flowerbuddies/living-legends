'use client';

import Cheat from '@/lib/cheat';
import { PlayerInfo } from '@/lib/playerInfo';
import { useState } from 'react';

export default function Home() {
  const [player, setPlayer] = useState<PlayerInfo>({
    name: 'Joerge',
    health: 100,
    lastNightSleep: 8,
    last12hSteps: 1000,
    skills: {
      attackModifier: 0,
      blockAmount: 0,
    },
    gears: null,
  });
  return (
    <main>
      <Cheat player={player} setPayer={setPlayer} />
    </main>
  );
}
