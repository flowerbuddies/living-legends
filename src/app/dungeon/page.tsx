// pages/index.tsx

"use client";

import React, { useState, FC } from "react";

type Choice = "sword" | "shield" | "bow";

const RPSGame: FC = () => {
  const options: Choice[] = ["sword", "shield", "bow"];

  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    setComputerChoice(options[randomIndex]);
  };

  const determineWinner = () => {
    if (userChoice === computerChoice) {
      setResult("It's a draw! Both sides stand firm.");
    } else if (
      (userChoice === "sword" && computerChoice === "bow") ||
      (userChoice === "shield" && computerChoice === "sword") ||
      (userChoice === "bow" && computerChoice === "shield")
    ) {
      setResult("You strike a mighty blow! You win!");
    } else {
      setResult("The enemy strikes back! Computer wins!");
    }
  };

  const handleUserChoice = (choice: Choice) => {
    setUserChoice(choice);
    generateComputerChoice();
    determineWinner();
  };

  return (
    <div>
      <h1>Dungeon</h1>
      <div>
        <div>
          <p>Your Choice: {userChoice}</p>
          <p>Enemy Choice: {computerChoice}</p>
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
