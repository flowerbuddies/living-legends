'use client';

import { PlayerInfo } from '@/lib/player';
import { platform } from 'os';
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
        <div className='h-12 w-[90vw] mx-auto rounded-full border-4 border-green bg-white mt-5 flex flex-col justify-center'>
          {player.health > 0 ? (
            <div
              className='h-full bg-red rounded-full flex flex-col justify-center'
              style={{ width: `${(player.health / player.maxHealth) * 100}%` }}
            >
              <p className='text-center font-semibold'>
                {player.health + ' / ' + player.maxHealth}
              </p>
            </div>
          ) : (
            <p className='text-center font-semibold'>
              You are dead, go to sleep to regenerate
            </p>
          )}
        </div>
      )}
    </div>
  );
}
