import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Gear from './gear';
import Skills from './skills';

export default function Character(props: {
  id: number;
  skill: [number, Dispatch<SetStateAction<number>>];
}) {
  return (
    <div className='flex justify-between'>
      <Skills id={props.id} skillL={props.skill} />
      <div className='absolute top-[25vh] w-screen z-[-1]'>
        <Image
          src='/assets/characters/hero_idle_3.png'
          alt='character'
          width={300}
          height={500}
          className='mx-auto'
        />
      </div>
      <Gear id={props.id} />
    </div>
  );
}
