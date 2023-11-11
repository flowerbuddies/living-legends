import { Dispatch, SetStateAction, useState } from "react";
import { PlayerInfo } from "../../lib/playerInfo";
import Image from "next/image";
import Gear from "./gear";
import Skills from "./skills";

export default function Character(props: any) {
	return (
		<div className="flex">
			<Skills player={props.player} />
			<div className="self-center">
				<Image
					src="/images/character.jpg"
					alt="character"
					width={300}
					height={500}
				/>
			</div>
			<Gear player={props.player} />
		</div>
	);
}
