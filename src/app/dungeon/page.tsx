// pages/index.tsx
"use client";

import React, { useState, FC, useEffect } from "react";
import { PlayerInfo } from "@/lib/player";
import { clamp } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import bg from "/public/assets/environments/gloomy_clearing.png";
import hero from "/public/assets/characters/hero_combat_3.png";

type Choice = "Sword" | "Shield" | "Bow";

interface Boss {
  name: string;
  health: number;
  strength: number;
}

const bossImages = [
  "/assets/characters/monster.png",
  "/assets/characters/monster_2.png",
  "/assets/characters/boss.png",
  // Add more images as needed
];

const RPSGame: FC<{ id: string }> = (props) => {
  const options: Choice[] = ["Sword", "Shield", "Bow"];
  const [player, setPlayer] = useState<PlayerInfo>();
  const [userHealth, setUserHealth] = useState<number>(100);
  const [userStrength, setUserStrength] = useState<number>(1);
  const [userDefence, setUserDefence] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  let isWin = false;

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

    setUserHealth(playerHealthAmount ?? 100);
    setUserStrength(playerAttackDamage ?? 1);
    setUserDefence(playerBlockAmount ?? 0);
  };
  const [bosses, setBosses] = useState<Boss[]>([
    { name: "Boss 1", health: 20, strength: 1 },
    { name: "Boss 2", health: 50, strength: 1.5 },
    { name: "Final Boss", health: 120, strength: 10 },
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
    if (userChoice === computerChoice) {
      setResult("It's a draw! Both sides stand firm.");
    } else if (
      (userChoice === "Sword" && computerChoice === "Bow") ||
      (userChoice === "Shield" && computerChoice === "Sword") ||
      (userChoice === "Bow" && computerChoice === "Shield")
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
    determineWinner();

    // Check if the user won or lost
    if (userHealth > 0) {
      if (
        currentBossIndex === bosses.length - 1 &&
        bosses[currentBossIndex].health < 1
      ) {
        setResult("Congratulations! You defeated all bosses. You win!");
        isWin = true;
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
      if (isWin === true) {
        console.log("vittu saatana");
        router.replace("/victory");
      } else {
        router.replace("/");
      }
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <Image
        src={bg}
        alt="background"
        className="absolute top-0 left-0 w-auto h-screen overflow-x-hidden object-cover -z-10"
      />
      <div>
        {/* <p>Your Choice: {userChoice}</p>
            <p>Enemy Choice: {computerChoice}</p> */}
      </div>
      <div className="absolute top-5 left-0 right-0">
        <p className="text-center font-bold text-xl" style={{ color: "white" }}>
          ❤️ {bosses[currentBossIndex].health}
        </p>
        <img
          src={bossImages[currentBossIndex]}
          alt={`Boss ${currentBossIndex + 1}`}
          className="w-[60vw] mx-auto -mt-10"
        />
      </div>
      <div className="absolute bottom-5 w-screen">
        <Image src={hero} alt="Player" className="h-[35vh] w-auto mx-auto" />
        <p className="text-center font-bold text-xl" style={{ color: "white" }}>
          ❤️ {userHealth}
        </p>
      </div>
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
        <p className="bg-white text-green text-center mb-5 text-xl">{result}</p>
        <div className="flex justify-evenly h-fit">
          {options.map((option) => (
            <button
              key={option}
              className="bg-green text-white rounded-full text-2xl font-semibold px-6 py-3 m-2"
              onClick={() => handleUserChoice(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RPSGame;
