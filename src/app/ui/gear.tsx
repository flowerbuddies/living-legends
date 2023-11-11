import Image from "next/image";

export default function Gear(props: any) {
	return (
		<div className="self-start">
			<div className="shadow self-center text-center">
				<h3>Gear</h3>
			</div>
			<div className="shadow self-center text-center my-1">
				<Image
					src="/assets/items/helmet.png"
					alt="helmet"
					width={50}
					height={50}
				/>
			</div>
			<div className="shadow self-center text-center my-1">
				<Image
					src="/assets/items/Chestplate.png"
					alt="chestplate"
					width={50}
					height={50}
				/>
			</div>
			<div className="shadow self-center text-center my-1">
				<Image
					src="/assets/items/sword.png"
					alt="sword"
					width={50}
					height={50}
				/>
			</div>
		</div>
	);
}
