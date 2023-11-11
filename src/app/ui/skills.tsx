import { Dispatch, SetStateAction, useState } from "react";
import { PlayerInfo } from "../../lib/playerInfo";

export default function Skills(props: any) {
	return (
		<>
			<div className="flex flex-col">
				<div className="self-center">
					<h3>Skills</h3>
				</div>
				<div className="shadow self-center text-center">
					<h4>💪</h4>
					{/* <p>{props.player.strength}</p> */}
					<p>1</p>
				</div>
				<div className="shadow self-center text-center">
					<h4>💪</h4>
					{/* <p>{props.player.strength}</p> */}
					<p>1</p>
				</div>
				<div className="shadow self-center text-center">
					<h4>💪</h4>
					{/* <p>{props.player.strength}</p> */}
					<p>1</p>
				</div>
			</div>
		</>
	);
}
