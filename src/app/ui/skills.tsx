'use client';

import { useEffect, useState } from 'react';
import { PlayerInfo } from '../../lib/player';

export default function Skills(props: { id: number }) {
  const [player, setPlayer] = useState<PlayerInfo>();

  // fetch patch request to update player
  let doUpdate = (data: any) => {
    fetch(`/api/player?id=${props.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((p: any) => {
        setPlayer({ ...player, ...p });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  let lvl_up = (skill: string) => {
    if (player?.skillPoints === 0) {
      return;
    }
    if (skill === 'attackModifier') {
      let data = {
        skillPoints: player && player?.skillPoints - 1,
        attackModifier: player && player?.attackModifier + 1,
      };
      doUpdate(data);
    } else if (skill === 'blockAmount') {
      let data = {
        skillPoints: player && player?.skillPoints - 1,
        blockAmount: player && player?.blockAmount + 1,
      };
      doUpdate(data);
    }
  };

  useEffect(() => {
    fetch(`/api/player?id=${props.id}`)
      .then((res) => res.json())
      .then((player: any) => {
        setPlayer(player);
      });
  }, []);

  return (
    <div className='flex flex-col bg-white border-4 border-green rounded-2xl mt-[5vw] py-2 ml-[5vw] px-1 items-center h-fit'>
      <h3 className='font-semibold text-green text-xl px-1'>Skills</h3>
      <p>
        💪 {player?.attackModifier}{' '}
        {player && player?.skillPoints > 0 ? (
          <button
            className='text-green font-extrabold'
            onClick={() => lvl_up('attackModifier')}
          >
            +
          </button>
        ) : null}
      </p>
      <p>
        🛡️ {player?.blockAmount}{' '}
        {player && player?.skillPoints > 0 ? (
          <button
            className='text-green font-extrabold'
            onClick={() => lvl_up('blockAmount')}
          >
            +
          </button>
        ) : null}
      </p>
      <p className='text-center'>Spend: {player?.skillPoints}</p>
    </div>
  );
}
