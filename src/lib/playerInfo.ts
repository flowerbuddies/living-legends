export interface Skills {
  attackModifier: number;
  blockAmount: number;
}

export interface PlayerInfo {
  name: string;
  health: number;
  maxHealth: number; // improved by gear
  lastNightSleep: number;
  last12hSteps: number;
  skills: Skills;
  skillPoints: number;
  gears: any;
}
