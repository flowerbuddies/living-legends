import Cheat from './ui/cheat';
import { PlayerInfo } from '@/lib/player';
import { useEffect, useState } from 'react';
import HealthBar from './ui/healthbar';

export default async function Home() {
  return (
    <main>
      <Cheat id={1} />
      <HealthBar id={1} />
    </main>
  );
}
