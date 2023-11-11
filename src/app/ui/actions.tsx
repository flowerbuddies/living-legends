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
      <div className='flex w-[90vw] justify-around mx-auto absolute left-0 bottom-20 right-0'>
        <button
          onClick={() => router.replace(`/dungeon?id=${props.id}`)}
          disabled={player?.health == 0}
          className='disabled:line-through decoration-4 bg-green h-16 px-4 rounded-[1.75rem] text-white font-extrabold text-2xl w-[40vw]'
        >
          Dungeon
        </button>
        <button
          disabled
          className='disabled:line-through decoration-4 bg-green h-16 px-4 rounded-[1.75rem] text-white font-extrabold text-2xl w-[40vw]'
        >
          Duel
        </button>
      </div>
    </>
  );
}
