export default function HealthBar(props: {
  health: number;
  maxHealth: number;
}) {
  return (
    <div className='h-12 w-48 bg-black'>
      <div
        className='h-12 bg-red-300'
        style={{ width: `${(props.health / props.maxHealth) * 100}%` }}
      ></div>
    </div>
  );
}
