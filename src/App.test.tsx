import { decodeText } from './App';

test('decodes two row encrypted text', () => {
	// arrange
	const cases = [
		{ rows: [ 'dfnteatal', 'eedheswl' ], text: 'defendtheeastwall' },
		{ rows: [ 'itb', 'nehhut', 'sdesce', 'iak' ], text: 'insidetheashbucket' }
	];

	cases.forEach(({ rows, text }) => {
		// act
		const decodedText = decodeText(rows);

		// assert
		expect(decodedText).toEqual(text);
	});
});
