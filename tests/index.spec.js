import { toXML } from 'jstoxml';
import _cloneDeep from 'lodash/cloneDeep';

import musicXmlRenderer from '../src/index';
import { chordParserFactory } from 'chord-symbol';
import { getDegreesAsObjects } from './helpers/harmonyTestHelpers';

const parseChord = chordParserFactory();

describe('public API', () => {
	test('export a function', () => {
		expect(typeof musicXmlRenderer).toBe('function');
	});

	test('add a `musicxml` property to the chord object', () => {
		const parsed = parseChord('C7');

		const filtered = musicXmlRenderer(parsed);
		expect(filtered).toHaveProperty('musicxml');
	});

	test('directly modify the given chord object', () => {
		const parsed = parseChord('C7');
		const filtered = musicXmlRenderer(parsed);

		expect(filtered).toBe(parsed);
		expect(parsed).toHaveProperty('musicxml');
	});

	test('do not modify the chord object except for adding the `musicxml` property', () => {
		const parsed = parseChord('C7');
		const cloned = _cloneDeep(parsed);

		const filtered = musicXmlRenderer(parsed);

		cloned.musicxml = _cloneDeep(filtered.musicxml);

		expect(filtered).toEqual(cloned);
	});
});

describe('Harmony object', () => {
	test('returns the expected harmony object', () => {
		const parsed = parseChord('C#m7(add b9,#9)/Ab');
		const filtered = musicXmlRenderer(parsed);

		const expectedOutput = {
			_name: 'harmony',
			_content: [
				{
					_name: 'root',
					_content: [
						{ _name: 'root-step', _content: 'C' },
						{ _name: 'root-alter', _content: '1' },
					],
				},
				{
					_name: 'kind',
					_attrs: { text: 'mi7' },
					_content: 'minor-seventh',
				},
				{
					_name: 'bass',
					_content: [
						{ _name: 'bass-step', _content: 'A' },
						{ _name: 'bass-alter', _content: '-1' },
					],
				},
				{
					_name: 'degree',
					_content: [
						{ _name: 'degree-value', _content: '9' },
						{ _name: 'degree-alter', _content: '-1' },
						{ _name: 'degree-type', _content: 'add' },
					],
				},
				{
					_name: 'degree',
					_content: [
						{ _name: 'degree-value', _content: '9' },
						{ _name: 'degree-alter', _content: '1' },
						{ _name: 'degree-type', _content: 'add' },
					],
				},
			],
		};

		expect(filtered.musicxml).toEqual(expectedOutput);
	});

	test('the returned object can be converted to a valid XML', () => {
		const parsed = parseChord('C#m7(add b9,#9)/Ab');
		const filtered = musicXmlRenderer(parsed);
		const actualXml = toXML(filtered.musicxml);

		const expectedXml =
			'<harmony>' +
			'<root>' +
			'<root-step>C</root-step>' +
			'<root-alter>1</root-alter>' +
			'</root>' +
			'<kind text="mi7">minor-seventh</kind>' +
			'<bass>' +
			'<bass-step>A</bass-step>' +
			'<bass-alter>-1</bass-alter>' +
			'</bass>' +
			'<degree>' +
			'<degree-value>9</degree-value>' +
			'<degree-alter>-1</degree-alter>' +
			'<degree-type>add</degree-type>' +
			'</degree>' +
			'<degree>' +
			'<degree-value>9</degree-value>' +
			'<degree-alter>1</degree-alter>' +
			'<degree-type>add</degree-type>' +
			'</degree>' +
			'</harmony>';

		expect(actualXml).toBe(expectedXml);
	});
});

describe('degrees implied by the kind/@text attribute should not be printable', () => {
	describe.each([
		/* */
		['C7sus(b5)', ['3', '4'], ['5']],
		['C9sus(b5)', ['3', '4'], ['5']],
		['C13sus(b5)', ['3', '4'], ['5']],
		['Cmi7sus(b5)', ['3', '4'], ['5']],
		['Cmi9sus(b5)', ['3', '4'], ['5']],
		['F#7SUS(add 3)', [], ['3']],
		['C69', ['9']],
		['Cmi69', ['9']],
		/* */
	])('%s', (symbol, nonPrintableDegrees, printableDegrees = []) => {
		test(
			'should have print-object="no" for degrees ' +
				nonPrintableDegrees.join(', '),
			() => {
				expect.assertions(
					nonPrintableDegrees.length + printableDegrees.length
				);

				const parsed = parseChord(symbol);
				const filtered = musicXmlRenderer(parsed);
				const allDegrees = getDegreesAsObjects(filtered.musicxml);

				nonPrintableDegrees.forEach((degree) => {
					const degreeObject = allDegrees.find(
						(el) => el.value === degree
					);
					expect(degreeObject.printObject).toBe('no');
				});

				printableDegrees.forEach((degree) => {
					const degreeObject = allDegrees.find(
						(el) => el.value === degree
					);
					expect(degreeObject.printObject).toBeUndefined();
				});
			}
		);
	});
});
