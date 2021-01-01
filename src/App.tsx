import React, { useState, FC } from 'react';
import './App.css';

export function decodeText(rows: string[]): string {
	rows = rows.filter(row => !!row);
	const isFirstOrLastRow = (rowI: number) => rowI === 0 || rowI === rows.length - 1;
	const maxI = rows.reduce((priorMax, row, rowI) =>
		Math.max(
			priorMax,
			(isFirstOrLastRow(rowI)) ? row.length * 2 : row.length
		)
	, 0);
	let decoded = '';

	for (let colI = 0; colI < maxI; ++colI) {
		// only add the top or the bottom row (not both) for every column except for the first
		const columOffset = (colI === 0) ? 0 : 1;

		for (let i = 0; i < rows.length - columOffset; ++i) {
			// go down columns every other row and up them the other times
			const rowI = (colI % 2)
				? rows.length - 2 - i
				: columOffset + i;

			// characters are only pulled from the top & bottom row every other time
			const realColI = (isFirstOrLastRow(rowI)) ? Math.ceil(colI / 2) : colI;

			const character = rows[rowI][realColI];
			if (character) {
				decoded += character;
			}
		}
	}

	return decoded;
};

export const App: FC = () => {
	const [ rows, setRows ] = useState([ '' ]);
	const [ decodedText, setDecodedText ] = useState('');

	const updateRows = (index: number, value: string) => {
		const newRows = rows.map((row, rowIndex) =>
			(rowIndex === index) ? value : row
		).filter(row =>
			!!row
		);

		newRows.push('');

		setRows(newRows);

		return newRows;
	};

	const onRowChange = (index: number, value: string) => {
		const updatedRows = updateRows(index, value);
		setDecodedText(decodeText(updatedRows));
	};

	return (
		<div className="App">
			<header className="App-header">
				Rail Fence Decoder
			</header>
			<div className="App-rows">
				{rows.map((row, index) =>
					<div className="App-row" key={index}>
						<input
							name={`row-${index}`}
							onChange={event => onRowChange(index, event.target.value)}
							value={row}
						/>
					</div>
				)}
			</div>
			<div className="App-decoded-text">{decodedText}</div>
		</div>
	);
}
