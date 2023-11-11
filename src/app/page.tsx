import Cheat from './ui/cheat';
import HealthBar from './ui/healthbar';
import Skills from './ui/skills';
import Actions from './ui/actions';

export default async function Home() {
  return (
    <main>
      <Cheat id={1} />
      <HealthBar id={1} />
      <Skills id={1} />
      <Actions id={1} />
    </main>
  );
}
