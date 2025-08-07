import React from "react";

const DEFAULT_ROWS = 3;
const DEFAULT_COLUMNS = 3;

type GridViewProps = {
	/**
	 * Number of rows in the grid. Defaults to 3 if not provided.
	 * If the number of children or elements exceeds the grid size, they will not be rendered.
	 */
	rows?: number;
	/**
	 * Number of columns in the grid. Defaults to 3 if not provided.
	 * If the number of children or elements exceeds the grid size, they will not be rendered.
	 */
	columns?: number;
	/**
	 * Array of elements to be rendered in the grid.
	 * Each element should specify its row and column position.
	 * If not provided, children will be used instead.
	 */
	elements?: Array<{
		element: React.ReactNode | React.ReactElement;
		row: number;
		column: number;
	}>;
	/**
	 * Additional CSS classes to apply to the grid container.
	 * This can be used for custom styling.
	 */
	classNames?: string;
	/**
	 * Gap between grid items. This can be a CSS value like '10px', '1rem', etc.
	 * If not provided, the default gap will be used.
	 */
	gap?: string;
} & React.PropsWithChildren;

/**
 * A React component that renders a grid layout.
 * It can display a specified number of rows and columns,
 * and can render either a list of elements or children.
 * If the number of elements or children exceeds the grid size,
 * they will not be rendered.
 */
export default function GridView({
	rows,
	columns,
	elements = [],
	children,
	classNames = "",
	gap = "gap-2",
}: GridViewProps) {
	// Validate rows and columns
	const validRows = rows && rows > 0 ? rows : DEFAULT_ROWS;
	const validColumns = columns && columns > 0 ? columns : DEFAULT_COLUMNS;

	// Only render if there are elements or children
	if (!elements.length && !children) {
		return null;
	}

	// Map through elements if provided, otherwise use children
	let renderedElements;

	if (elements.length) {
		renderedElements = elements.map((item, index) => {
			if (index >= validRows * validColumns || !item.element) {
				return null;
			}

			return (
				<div
					key={index}
					style={{
						gridRow: item.row,
						gridColumn: item.column,
						height: "max-content",
					}}
				>
					{item.element}
				</div>
			);
		});
	} else {
		renderedElements = React.Children.toArray(children).map((child, index) => {
			if (index >= validRows * validColumns) {
				return null;
			}

			return child;
		});
	}

	return (
		<div
			className={` ${classNames} ${gap}`}
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${validColumns}, 1fr)`,
				gridTemplateRows: `repeat(${validRows}, 1fr)`,
			}}
		>
			{renderedElements}
		</div>
	);
}
