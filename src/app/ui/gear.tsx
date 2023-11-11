import Image from 'next/image';

export default function Gear(props: any) {
  return (
    <div className='bg-white border-4 rounded-2xl border-green flex flex-col items-center pt-2 mr-[2vw] mt-[2vw]'>
      <h3 className='font-semibold text-green text-xl px-1'>Gear</h3>
      <div className=''>
        <Image
          src='/assets/items/helmet.png'
          alt='helmet'
          width={50}
          height={50}
        />
      </div>
      <div className=''>
        <Image
          src='/assets/items/Chestplate.png'
          alt='chestplate'
          width={50}
          height={50}
        />
      </div>
      <div className=''>
        <Image
          src='/assets/items/sword.png'
          alt='sword'
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
