// pages/index.tsx

"use client";

import React, { useState, FC, useEffect } from "react";

type Choice = "sword" | "shield" | "bow";

const RPSGame: FC = () => {
	const options: Choice[] = ["sword", "shield", "bow"];

	const [userChoice, setUserChoice] = useState<Choice | null>(null);
	const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
	const [result, setResult] = useState<string | null>(null);
	const [hp_player, setPlayerHp] = useState(100);
	const [hp_enemy, setEnemyHp] = useState(100);

	const generateComputerChoice = () => {
		const randomIndex = Math.floor(Math.random() * options.length);
		console.log(`Generated computer choice: ${options[randomIndex]}`);
		setComputerChoice(options[randomIndex]);
	};

	const determineWinner = () => {
		if (userChoice === null || computerChoice === null) {
			return;
		}
		console.log(
			`User choice: ${userChoice}, Computer choice: ${computerChoice}`
		);
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

	useEffect(() => {
		determineWinner(), [userChoice, computerChoice];
	});

	const handleUserChoice = (choice: Choice) => {
		console.log(`User choice: ${choice}`);
		setUserChoice(choice);
		generateComputerChoice();
	};

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
						<p className="text-center">❤️ {hp_enemy}</p>
						<img src="https://picsum.photos/500" alt="Enemy" />
					</div>
					<div className="grid grid-cols-2 items-center">
						<img src="https://picsum.photos/500" alt="Player" />
						<p className="text-center">❤️ {hp_enemy}</p>
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
