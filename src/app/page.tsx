'use client';

import Cheat from './ui/cheat';
import HealthBar from './ui/healthbar';
import Actions from './ui/actions';
import { useState } from 'react';
import bg from '../../public/assets/environments/clearing.png';
import Image from 'next/image';
import Character from './ui/character';

export default function Home() {
  const [id, setId] = useState(-1);
  return (
    <main>
      <Image
        src={bg}
        alt='background'
        className='absolute top-0 left-0 w-auto h-screen overflow-x-hidden object-cover -z-10'
      />
      {id === -1 && (
        <>
          <label>
            <input
              type='radio'
              name='radioSet'
              checked={id === 1}
              onChange={() => setId(1)}
            />
            Player 1
          </label>
          <label>
            <input
              type='radio'
              name='radioSet'
              checked={id === 2}
              onChange={() => setId(2)}
            />
            Player 2
          </label>
        </>
      )}
      {id !== -1 && (
        <>
          <Cheat id={id} />
          <HealthBar id={id} />
          <Character id={id} />
          <Actions id={id} />
        </>
      )}
    </main>
  );
}
