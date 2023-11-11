// pages/index.tsx
"use client";

import React, { useState, FC, useEffect } from "react";
import { PlayerInfo } from "@/lib/player";
import { clamp } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Choice = "sword" | "shield" | "bow";

interface Boss {
  name: string;
  health: number;
  strength: number;
}

const RPSGame: FC<{ id: string }> = (props) => {
  const options: Choice[] = ["sword", "shield", "bow"];
  const [player, setPlayer] = useState<PlayerInfo>();
  const [userHealth, setUserHealth] = useState<number>(100);
  const [userStrength, setUserStrength] = useState<number>(1);
  const [userDefence, setUserDefence] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    fetch(`/api/player?id=${id}`)
      .then((res) => res.json())
      .then((playerData: PlayerInfo) => {
        setPlayer(playerData);
      });
  }, [id]);
  useEffect(() => {
    // Start the game when player information is fetched
    if (player) {
      startGame();
    }
  }, [player]);

  const startGame = () => {
    const playerAttackDamage = player?.attackModifier;
    const playerHealthAmount = player?.health;
    const playerBlockAmount = player?.blockAmount;
    console.log(playerAttackDamage + "pad " + playerHealthAmount + "pah");

    setUserHealth(playerHealthAmount ?? 100);
    setUserStrength(playerAttackDamage ?? 1);
    setUserDefence(playerBlockAmount ?? 0);
  };
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
      bosses[currentBossIndex].health =
        bosses[currentBossIndex].health - damage;
      setResult(
        "You strike a mighty blow with your " +
          userChoice +
          " and do " +
          damage +
          " dmg!"
      );
    } else {
      const damage = Math.floor(10 * (currentBoss.strength * damageMultiplier));
      setUserHealth((prevHealth) => prevHealth - (damage - userDefence));
      setResult(`${currentBoss.name} strikes back and does ${damage} dmg!`);
    }
  };

  const nextBoss = () => {
    // Move to the next boss
    setCurrentBossIndex((prevIndex) => prevIndex + 1);
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
        updatePlayer();
      } else if (bosses[currentBossIndex].health < 1) {
        setResult("You defeated the boss! Get ready for the next battle.");
        nextBoss();
      }
    } else {
      setResult("Game over! You were defeated by the boss. Try again!");
      updatePlayer();
    }

    function updatePlayer() {
      if (!player) return;
      const healthToRecover = userHealth;

      fetch(`/api/player?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...player,
          health: clamp(userHealth, 0, player.maxHealth),
        }),
      });
      router.replace("/");
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
