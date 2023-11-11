'use client';

import { useEffect, useState } from 'react';
import { PlayerInfo } from '../../lib/player';
import { useRouter } from 'next/navigation';

export default function Actions(props: { id: number }) {
  const [player, setPlayer] = useState<PlayerInfo>();

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/player?id=${props.id}`)
      .then((res) => res.json())
      .then((player: any) => {
        setPlayer(player);
      });
  }, []);
  return (
    <>
      <div className='flex'>
        <button
          onClick={() => router.replace('/dungeon')}
          disabled={player?.health == 0}
          className='disabled:bg-gray-200 bg-green-200'
        >
          Enter a dungeon
        </button>
        <button disabled className='disabled:bg-gray-200'>
          PvP
        </button>
      </div>
    </>
  );
}
