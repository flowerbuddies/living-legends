"use client";

import { useEffect, useState } from "react";
import { PlayerInfo } from "../../lib/player";

export default function Skills(props: { id: number }) {
	const [player, setPlayer] = useState<PlayerInfo>();

	let lolwhat = () => {};

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
					<button
						className="bg-blue-500 text-white rounded w-6 ml-3"
						onClick={lolwhat}
					>
						+
					</button>
				</div>
				<div className="shadow self-center flex w-full justify-between">
					<p>🛡️: {player?.blockAmount}</p>
					<button
						className="bg-blue-500 text-white rounded w-6 ml-3"
						onClick={lolwhat}
					>
						+
					</button>
				</div>
			</div>
		</>
	);
}
