"use client";

import { useEffect, useState } from "react";
import { PlayerInfo } from "../../lib/player";

export default function Skills(props: { id: number }) {
	const [player, setPlayer] = useState<PlayerInfo>();

	// fetch patch request to update player
	let doUpdate = (data: any) => {
		fetch(`/api/player?id=${props.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}
				return res.json();
			})
			.then((p: any) => {
				setPlayer({ ...player, ...p });
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	let lvl_up = (skill: string) => {
		if (player?.skillPoints === 0) {
			return;
		}
		if (skill === "attackModifier") {
			let data = {
				skillPoints: player && player?.skillPoints - 1,
				attackModifier: player && player?.attackModifier + 1,
			};
			doUpdate(data);
		} else if (skill === "blockAmount") {
			let data = {
				skillPoints: player && player?.skillPoints - 1,
				blockAmount: player && player?.blockAmount + 1,
			};
			doUpdate(data);
		}
	};

	useEffect(() => {
		fetch(`/api/player?id=${props.id}`)
			.then((res) => res.json())
			.then((player: any) => {
				setPlayer(player);
			});
	}, []);

	return (
		<>
			<div className="flex flex-col">
				<div className="self-center">
					<h3>Skills</h3>
				</div>
				<div className="shadow self-center flex w-full justify-between my-1">
					<p>💪: {player?.attackModifier}</p>
					{player && player?.skillPoints > 0 ? (
						<button
							className="bg-blue-500 text-white rounded w-6 ml-3"
							onClick={() => lvl_up("attackModifier")}
						>
							+
						</button>
					) : null}
				</div>
				<div className="shadow self-center flex w-full justify-between">
					<p>🛡️: {player?.blockAmount}</p>
					{player && player?.skillPoints > 0 ? (
						<button
							className="bg-blue-500 text-white rounded w-6 ml-3"
							onClick={() => lvl_up("blockAmount")}
						>
							+
						</button>
					) : null}
				</div>
				<div className="text-center">
					Available points: {player?.skillPoints}
				</div>
			</div>
		</>
	);
}
