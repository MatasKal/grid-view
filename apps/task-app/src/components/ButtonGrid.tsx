import { useState } from "react";
import { GridView } from "ui-library";

const BUTTON_ACTIVE_DURATION = 2000;

export default function ButtonGrid() {
	const [active, setActive] = useState<string[]>([]);

	const buttonPositions = [
		[1, 1],
		[1, 2],
		[1, 3],
		[2, 3],
		[3, 1],
		[3, 2],
		[3, 3],
	];

	const buttons = buttonPositions.map(([row, column]) => {
		const isButtonActive = isActive(`${row}-${column}`);

		return {
			element: (
				<button
					className={` bg-green-50 transition-colors ease-out duration-300 rounded-md sm:rounded-xl w-full h-full block m- ${
						isButtonActive ? "bg-purple-500" : "bg-purple-200"
					}`}
					onClick={() => {
						handleButtonClick(row, column);
					}}
				></button>
			),
			row: row,
			column: column,
		};
	});

	function isActive(key: string) {
		return active.includes(key);
	}

	function handleButtonClick(row: number, column: number) {
		const key = `${row}-${column}`;

		if (isActive(key)) {
			return;
		}

		setActive((prev) => [...prev, key]);

		setTimeout(() => {
			setActive((prev) => prev.filter((item) => item !== key));
		}, BUTTON_ACTIVE_DURATION);
	}

	return (
		<GridView
			rows={3}
			columns={3}
			elements={buttons}
			classNames="p-5 rounded-2xl border-2 border-gray-200 w-full max-w-[500px] m-8 aspect-square"
			gap="gap-3"
		/>
	);
}
