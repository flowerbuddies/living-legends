// pages/index.tsx
// "use client";

import React, { useState, FC, useEffect } from "react";

type Choice = "sword" | "shield" | "bow";

interface Boss {
  name: string;
  health: number;
  strength: number;
}

const RPSGame: FC = () => {
  const options: Choice[] = ["sword", "shield", "bow"];

  const [userHealth, setUserHealth] = useState<number>(100);
  const [userStrength, setUserStrength] = useState<number>(4);

  const [bosses, setBosses] = useState<Boss[]>([
    { name: "Boss 1", health: 50, strength: 1 },
    { name: "Boss 2", health: 75, strength: 1.5 },
    { name: "Final Boss", health: 120, strength: 2 },
  ]);

  const [currentBossIndex, setCurrentBossIndex] = useState<number>(0);

  let [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    setComputerChoice(options[randomIndex]);
  };

  const determineWinner = () => {
    const damageMultiplier = 1 * Math.random() * 0.5;
    const currentBoss = bosses[currentBossIndex];
    console.log("Boss health is " + bosses[currentBossIndex].health);
    if (userChoice === computerChoice) {
      setResult("It's a draw! Both sides stand firm.");
    } else if (
      (userChoice === "sword" && computerChoice === "bow") ||
      (userChoice === "shield" && computerChoice === "sword") ||
      (userChoice === "bow" && computerChoice === "shield")
    ) {
      const damage = Math.floor(10 * (userStrength * damageMultiplier));
      console.log(damage + " you did this");
      bosses[currentBossIndex].health =
        bosses[currentBossIndex].health - damage;
      setResult("You strike a mighty blow!");
    } else {
      const damage = Math.floor(10 * (currentBoss.strength * damageMultiplier));
      console.log(damage + " they did this");
      setUserHealth((prevHealth) => prevHealth - damage);
      setResult(`${currentBoss.name} strikes back!`);
    }
  };

  const checkFightState = () => {
    // Check if the user or the current boss has health remaining
    return userHealth > 0 && bosses[currentBossIndex].health > 0;
  };

  const nextBoss = () => {
    // Move to the next boss
    setCurrentBossIndex((prevIndex) => prevIndex + 1);
    // Reset user health for the next battle
  };

  const handleUserChoice = (choice: Choice) => {
    setUserChoice(choice);

    // Run the game loop when the userChoice changes
    generateComputerChoice();
    console.log(
      "your weapon is " +
        userChoice +
        " and the enemy weapon is " +
        computerChoice
    );
    determineWinner();

    // Check if the user won or lost
    if (userHealth > 0) {
      if (currentBossIndex === bosses.length - 1) {
        setResult("Congratulations! You defeated all bosses. You win!");
      } else if (bosses[currentBossIndex].health < 1) {
        setResult("You defeated the boss! Get ready for the next battle.");
        nextBoss();
      }
    } else {
      setResult("Game over! You were defeated by the boss. Try again!");
    }
  };

  // useEffect(() => {
  // });

  return (
    <>
      <div className="container ">
        <div className="flex flex-col justify-between h-screen">
          <div>
            {/* <p>Your Choice: {userChoice}</p>
            <p>Enemy Choice: {computerChoice}</p> */}
            <p>{result}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <p className="text-center">❤️ {bosses[currentBossIndex].health}</p>
            <img src="https://picsum.photos/500" alt="Boss" />
          </div>
          <div className="grid grid-cols-2 items-center">
            <img src="https://picsum.photos/500" alt="Player" />
            <p className="text-center">❤️ {userHealth}</p>
          </div>
          <div className="grid grid-cols-3 shadow h-20">
            {options.map((option) => (
              <button
                key={option}
                className="bg-blue-500 text-white rounded"
                onClick={() => handleUserChoice(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RPSGame;
