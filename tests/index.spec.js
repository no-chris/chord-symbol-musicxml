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
