import db from './db';

export interface Skills {}

export interface PlayerInfo {
  name: string;
  health: number;
  maxHealth: number; // improved by gear
  lastNightSleep: number;
  last12hSteps: number;
  attackModifier: number;
  blockAmount: number;
  // skills: Skills;
  skillPoints: number;
  // gears: any;
}

export async function getPlayer(id: number): Promise<PlayerInfo> {
  return (await db.player.findUnique({
    where: { id: 1 },
  }))!;
}

export async function updatePlayer(id: number, data: Partial<PlayerInfo>) {
  return await db.player.update({
    where: { id: 1 },
    data,
  });
}
