'use client';

import { PlayerInfo } from '@/lib/player';
import { useEffect, useState } from 'react';

export default function HealthBar(props: { id: number }) {
  const [player, setPlayer] = useState<PlayerInfo>();

  useEffect(() => {
    fetch(`/api/player?id=${props.id}`)
      .then((res) => res.json())
      .then((player: any) => {
        setPlayer(player);
      });
  }, []);

  return (
    <div>
      {player && (
        <div className='h-12 w-48 bg-black'>
          <div
            className='h-12 bg-red-300'
            style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
