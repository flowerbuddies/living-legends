import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Gear from "./gear";
import Skills from "./skills";

export default function Character(props: { id: number }) {
	return (
		<div className="flex">
			<Skills id={props.id} />
			<div className="self-center mx-3">
				<Image
					src="/assets/hero_idle_2.png"
					alt="character"
					width={300}
					height={500}
				/>
			</div>
			<Gear id={props.id} />
		</div>
	);
}
