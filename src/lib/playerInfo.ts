export interface Skills {
  attackModifier: number;
  blockAmount: number;
}

export interface PlayerInfo {
  name: string;
  health: number;
  lastNightSleep: number;
  last12hSteps: number;
  skills: Skills;
  gears: any;
}
