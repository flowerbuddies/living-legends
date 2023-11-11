// pages/index.tsx

"use client";

import React, { useState, FC } from "react";

type Choice = "sword" | "shield" | "bow";

const RPSGame: FC = () => {
  const options: Choice[] = ["sword", "shield", "bow"];

  const [userHealth, setUserHealth] = useState<number>(100);
  const [userStrength, setUserStrength] = useState<number>(1);

  const [computerHealth, setComputerHealth] = useState<number>(100);
  const [computerStrength, setComputerStrength] = useState<number>(1);

  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    setComputerChoice(options[randomIndex]);
  };

  const determineDamage = () => {
    const damageMultiplier = 1 * Math.random() * 0.5;
    if (userChoice === computerChoice) {
      setResult("It's a draw! Both sides stand firm.");
    } else if (
      (userChoice === "sword" && computerChoice === "bow") ||
      (userChoice === "shield" && computerChoice === "sword") ||
      (userChoice === "bow" && computerChoice === "shield")
    ) {
      const damage = Math.floor(10 * (userStrength * damageMultiplier));
      setComputerHealth((computerHealth) => computerHealth - damage);
      setResult("You strike a mighty blow!");
    } else {
      const damage = Math.floor(10 * (computerStrength * damageMultiplier));
      setUserHealth((userHealth) => userHealth - damage);
      setResult("The enemy strikes back! Computer wins!");
    }
  };

  const handleUserChoice = (choice: Choice) => {
    generateComputerChoice();
    determineDamage();
  };

  return (
    <div>
      <h1>Dungeon</h1>
      <div>
        <div>
          <p>Your Choice: {userChoice}</p>
          <p>Your Health: {userHealth}</p>
          <p>{result}</p>
        </div>
        <div>
          {options.map((option) => (
            <button key={option} onClick={() => handleUserChoice(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RPSGame;

// setUserChoice(choice);
