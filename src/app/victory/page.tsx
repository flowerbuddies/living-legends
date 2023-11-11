"use client";

import bg from "../../../public/assets/environments/armory_2.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Victory() {
	const router = useRouter();

	return (
		<div className="z-50" onClick={() => router.replace("/")}>
			<Image
				src={bg}
				alt="background"
				className="absolute top-0 left-0 w-auto h-screen overflow-x-hidden object-cover -z-10 blur-sm"
			/>
			<div className="flex flex-col justify-center items-center">
				<Image
					src="/assets/text/victory.png"
					width={300}
					height={100}
					alt="background"
					className="absolute top-20 w-auto h-auto"
				/>
			</div>

			<div className="flex flex-col justify-center items-center h-screen">
				<Image
					src="/assets/items/Chestplate.png"
					alt="loot"
					width={200}
					height={200}
					style={{ transform: "translateY(5rem)" }}
				/>
				<Image
					src="/assets/items/treasure.png"
					alt="loot"
					width={270}
					height={270}
					style={{ transform: "translateY(-6rem)" }}
				/>
			</div>
		</div>
	);
}
