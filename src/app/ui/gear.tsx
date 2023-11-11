import { Dispatch, SetStateAction, useState } from "react";
import { PlayerInfo } from "../../lib/playerInfo";

export default function Gear(props: any) {
	return (
		<div className="self-start">
			<div className="shadow self-center text-center">
				<h3>Gear</h3>
			</div>
			<div className="shadow self-center text-center">
				<h4>Hat</h4>
			</div>
		</div>
	);
}
