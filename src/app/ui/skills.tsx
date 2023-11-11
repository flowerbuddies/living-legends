'use client';

import { useEffect, useState } from 'react';
import { PlayerInfo } from '../../lib/player';

export default function Skills(props: { id: number }) {
  const [player, setPlayer] = useState<PlayerInfo>();

  useEffect(() => {
    fetch(`/api/player?id=${props.id}`)
      .then((res) => res.json())
      .then((player: any) => {
        setPlayer(player);
      });
  }, []);
  return (
    <>
      <div className='flex flex-col'>
        <div className='self-center'>
          <h3>Skills</h3>
        </div>
        <div className='shadow self-center text-center'>
          <h4>💪</h4>
          <p>{player?.attackModifier}</p>
        </div>
        <div className='shadow self-center text-center'>
          <h4>🛡️</h4>
          <p>{player?.blockAmount}</p>
        </div>
      </div>
    </>
  );
}
