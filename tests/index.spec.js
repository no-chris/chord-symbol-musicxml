import { toXML } from 'jstoxml';

import musicXmlRenderer from '../src/index';
import _cloneDeep from 'lodash/cloneDeep';

import { chordParserFactory } from 'chord-symbol';
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
		const parsed = parseChord('Cm7/G');
		const filtered = musicXmlRenderer(parsed);

		const expectedOutput = {
			_name: 'harmony',
			_content: [
				{
					_name: 'root',
					_content: {
						_name: 'root-step',
						_content: 'C',
					},
				},
				{
					_name: 'kind',
					_attrs: {
						text: 'mi7',
					},
					_content: 'minor7',
				},
				{
					_name: 'bass',
					_content: {
						_name: 'bass-step',
						_content: 'G',
					},
				},
			],
		};

		expect(filtered.musicxml).toEqual(expectedOutput);
	});

	test('the returned object can be converted to a valid XML', () => {
		const parsed = parseChord('Cm7/G');
		const filtered = musicXmlRenderer(parsed);
		const actualXml = toXML(filtered.musicxml);

		const expectedXml =
			'<harmony>' +
			'<root><root-step>C</root-step></root>' +
			'<kind text="mi7">minor7</kind>' +
			'<bass><bass-step>G</bass-step></bass>' +
			'</harmony>';

		expect(actualXml).toBe(expectedXml);
	});
});
