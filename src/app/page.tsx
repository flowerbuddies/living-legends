"use client";

import Cheat from "./ui/cheat";
import HealthBar from "./ui/healthbar";
import Skills from "./ui/skills";
import Actions from "./ui/actions";
import { useState } from "react";
import Character from "./ui/character";

export default function Home() {
	const [id, setId] = useState(-1);
	return (
		<main>
			{id === -1 && (
				<>
					<label>
						<input
							type="radio"
							name="radioSet"
							value="1"
							checked={id === 1}
							onChange={() => setId(1)}
						/>
						Player 1
					</label>
					<label>
						<input
							type="radio"
							name="radioSet"
							value="2"
							checked={id === 2}
							onChange={() => setId(2)}
						/>
						Player 2
					</label>
				</>
			)}
			{id !== -1 && (
				<>
					<Cheat id={id} />
					<HealthBar id={id} />
					<Character id={id} />
					<Actions id={id} />
				</>
			)}
		</main>
	);
}
