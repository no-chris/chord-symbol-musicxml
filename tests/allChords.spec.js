import { chordParserFactory } from '../../chord-symbol/src/index';
import musicXmlRenderer from '../src/index';
import harmonyToIntervals from '../src/helpers/harmonyToIntervals';
import { getDegreesAsObjects } from './helpers/harmonyTestHelpers';
import d from './allDegrees';

describe.each(
	/* prettier-ignore */
	[

		// Chords symbols from: Contemporary Music Theory

		['C5', 'C', '5', 'power', []],
		['C(omit3)', 'C', '5', 'power', []],
		['Csus', 'C', 'sus4', 'suspended-fourth', []],
		['C(b5)', 'C', '', 'major', [d.alterb5]],
		['C', 'C', '', 'major', []],
		['C+', 'C', '+', 'augmented', []],
		['C6(b5)', 'C', '6', 'major-sixth', [d.alterb5]],
		['C6', 'C', '6', 'major-sixth', []],
		['C6(#5)', 'C', '6', 'major-sixth', [d.alterx5]],
		['C69', 'C', '69', 'major-sixth', [d.add9]],
		['C69(#11)', 'C', '69', 'major-sixth', [d.add9, d.alterx11]],
		['Cma6(b5)', 'C', '6', 'major-sixth', [d.alterb5]],
		['Cma6', 'C', '6', 'major-sixth', []],
		['Cma69', 'C', '69', 'major-sixth', [d.add9]],
		['Cma6(#5)', 'C', '6', 'major-sixth', [d.alterx5]],
		['Cma7(b5)', 'C', 'ma7', 'major-seventh', [d.alterb5]],
		['Cma7', 'C', 'ma7', 'major-seventh', []],
		['Cma7(#5)', 'C', 'ma7', 'major-seventh', [d.alterx5]],
		['Cadd9(omit3)', 'C', 'sus2', 'suspended-second', []],
		['Cadd9(no3)', 'C', 'sus2', 'suspended-second', []],
		['Cadd9', 'C', '', 'major', [d.add9]],
		['C(add9)', 'C', '', 'major', [d.add9]],
		['Cma9', 'C', 'ma9', 'major-ninth', []],
		['Cma9(no3)', 'C', 'ma9', 'major-ninth', [d.omit3]],
		['Cma9(#11)', 'C', 'ma9', 'major-ninth', [d.alterx11]],
		['Cma9(omit3)', 'C', 'ma9', 'major-ninth', [d.omit3]],
		['Cma13', 'C', 'ma13', 'major-13th', []],
		['Cma13(#11)', 'C', 'ma13', 'major-13th', [d.alterx11]],
		['C°', 'C', 'dim', 'diminished', []],
		['Cmi', 'C', 'mi', 'minor', []],
		['Cmi add9', 'C', 'mi', 'minor', [d.add9]],
		['Cmi(add9)', 'C', 'mi', 'minor', [d.add9]],
		['Cmi6', 'C', 'mi6', 'minor-sixth', []],
		['Cmi69', 'C', 'mi69', 'minor-sixth', [d.add9]],
		['Cmi69(add11)', 'C', 'mi69', 'minor-sixth', [d.add9, d.add11]],
		['Cmi(#5)', 'C', 'mi', 'minor', [d.alterx5]],
		['Cmi7', 'C', 'mi7', 'minor-seventh', []],
		['Cmi7(b5)', 'C', 'ø', 'half-diminished', []],
		['Cmi7(#5)', 'C', 'mi7', 'minor-seventh', [d.alterx5]],
		['Cmi7(b5,#5)', 'C', 'mi7', 'minor-seventh', [d.alterb5, d.alterx5]],
		['Cmi7(b5,add11)', 'C', 'mi7', 'minor-seventh', [d.alterb5, d.add11]],
		['Cmi7(add11)', 'C', 'mi7', 'minor-seventh', [d.add11]],
		['Cmi9', 'C', 'mi9', 'minor-ninth', []],
		['Cmi9(b5)', 'C', 'mi9', 'minor-ninth', [d.alterb5]],
		['Cmi11', 'C', 'mi11', 'minor-11th', []],
		['Cmi11(b5)', 'C', 'mi11', 'minor-11th', [d.alterb5]],
		['Cmi11(b5,no3)', 'C', 'mi11', 'minor-11th', [d.omitb3, d.alterb5]],
		['Cmi11(b5,#5)', 'C', 'mi11', 'minor-11th', [d.alterb5, d.alterx5]],
		['Cmi11(b5,b13)', 'C', 'mi11', 'minor-11th', [d.alterb5, d.alterb13]],
		['Cmi13', 'C', 'mi13', 'minor-13th', []],
		['CmiMa7', 'C', 'miMa7', 'major-minor', []],
		['CmiMa9', 'C', 'miMa9', 'major-minor', [d.add9]],
		['CmiMa9(add13)', 'C', 'miMa9', 'major-minor', [d.add9, d.add13]],
		['CmiMa11', 'C', 'miMa11', 'major-minor', [d.add9, d.add11]],
		['CmiMa13', 'C', 'miMa13', 'major-minor', [d.add9, d.add11, d.add13]],
		['C7', 'C', '7', 'dominant', []],
		['C7sus', 'C', '7sus', 'dominant', [d.omit3, d.add4]],
		['C7sus(b9)', 'C', '7sus', 'dominant', [d.omit3, d.add4, d.alterb9]],
		['C7(b5)', 'C', '7', 'dominant', [d.alterb5]],
		['C7(b5,#5)', 'C', '7', 'dominant', [d.alterb5, d.alterx5]],
		['C7(b5,#5,b9)', 'C', '7', 'dominant', [d.alterb5, d.alterx5, d.alterb9]],
		['C7(b5,#5,#9)', 'C', '7', 'dominant', [d.alterb5, d.alterx5, d.alterx9]],
		['C7(b5,#5,b9,#9)', 'C', '7', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9]],
		['C7(b5,#5,b9,#9,b13)', 'C', '7', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9, d.alterb13]],
		['C7(b5,b9)', 'C', '7', 'dominant', [d.alterb5, d.alterb9]],
		['C7(b5,b9,#9)', 'C', '7', 'dominant', [d.alterb5, d.alterb9, d.alterx9]],
		['C7(b5,b9,b13)', 'C', '7', 'dominant', [d.alterb5, d.alterb9, d.alterb13]],
		['C7(b5,#9)', 'C', '7', 'dominant', [d.alterb5, d.alterx9]],
		['C7(b5,#9,b13)', 'C', '7', 'dominant', [d.alterb5, d.alterx9, d.alterb13]],
		['C7(b5,b13)', 'C', '7', 'dominant', [d.alterb5, d.alterb13]],
		['C7(#5)', 'C', '+7', 'augmented-seventh', []],
		['C7(#5,b9)', 'C', '7', 'dominant', [d.alterx5, d.alterb9]],
		['C7(#5,#9)', 'C', '7', 'dominant', [d.alterx5, d.alterx9]],
		['C7(#5,b9,#9)', 'C', '7', 'dominant', [d.alterx5, d.alterb9, d.alterx9]],
		['C7(#5,b9,#11)', 'C', '7', 'dominant', [d.alterx5, d.alterb9, d.alterx11]],
		['C7(#5,#9,#11)', 'C', '7', 'dominant', [d.alterx5, d.alterx9, d.alterx11]],
		['C7(#5,b9,#9,#11)', 'C', '7', 'dominant', [d.alterx5, d.alterb9, d.alterx9, d.alterx11]],
		['C7(#5, #11)', 'C', '7', 'dominant', [d.alterx5, d.alterx11]],
		['C7(b9)', 'C', '7', 'dominant', [d.alterb9]],
		['C7(b9,#9)', 'C', '7', 'dominant', [d.alterb9, d.alterx9]],
		['C7(b9,#11)', 'C', '7', 'dominant', [d.alterb9, d.alterx11]],
		['C7(b9,#9,#11)', 'C', '7', 'dominant', [d.alterb9, d.alterx9, d.alterx11]],
		['C7(b9,#9,b13)', 'C', '7', 'dominant', [d.alterb9, d.alterx9, d.alterb13]],
		['C7(b9,#9,#11,b13)', 'C', '7', 'dominant', [d.alterb9, d.alterx9, d.alterx11, d.alterb13]],
		['C7(b9,#11,b13)', 'C', '7', 'dominant', [d.alterb9, d.alterx11, d.alterb13]],
		['C7(b9,b13)', 'C', '7', 'dominant', [d.alterb9, d.alterb13]],
		['C7(#9)', 'C', '7', 'dominant', [d.alterx9]],
		['C7(#9,#11)', 'C', '7', 'dominant', [d.alterx9, d.alterx11]],
		['C7(#9,b13)', 'C', '7', 'dominant', [d.alterx9, d.alterb13]],
		['C7(#9,#11,b13)', 'C', '7', 'dominant', [d.alterx9, d.alterx11, d.alterb13]],
		['C7(#11)', 'C', '7', 'dominant', [d.alterx11]],
		['C7(#11,b13)', 'C', '7', 'dominant', [d.alterx11, d.alterb13]],
		['C7(b13)', 'C', '7', 'dominant', [d.alterb13]],
		['C9', 'C', '9', 'dominant-ninth', []],
		['C9(13)', 'C', '13', 'dominant-13th', []],
		['C9(add13)', 'C', '13', 'dominant-13th', []],
		['C9sus', 'C', '9sus', 'dominant-ninth', [d.omit3, d.add4]],
		['C9(b5)', 'C', '9', 'dominant-ninth', [d.alterb5]],
		['C9(b5,#5)', 'C', '9', 'dominant-ninth', [d.alterb5, d.alterx5]],
		['C9(b5,b13)', 'C', '9', 'dominant-ninth', [d.alterb5, d.alterb13]],
		['C9(#5,#11)', 'C', '9', 'dominant-ninth', [d.alterx5, d.alterx11]],
		['C9(#11)', 'C', '9', 'dominant-ninth', [d.alterx11]],
		['C9(#11,b13)', 'C', '9', 'dominant-ninth', [d.alterx11, d.alterb13]],
		['C11', 'C', '9sus', 'dominant-11th', [d.omit3]],
		['C11(b9)', 'C', '7sus', 'dominant-11th', [d.omit3, d.alterb9]],
		['C13', 'C', '13', 'dominant-13th', []],
		['C13sus', 'C', '13sus', 'dominant-13th', [d.omit3, d.add4]],
		['C13(b5)', 'C', '13', 'dominant-13th', [d.alterb5]],
		['C13(b5,b9)', 'C', '13', 'dominant-13th', [d.alterb5, d.alterb9]],
		['C13(b5,#9)', 'C', '13', 'dominant-13th', [d.alterb5, d.alterx9]],
		['C13(b5,b9,#9)', 'C', '13', 'dominant-13th', [d.alterb5, d.alterb9, d.alterx9]],
		['C13(b9)', 'C', '13', 'dominant-13th', [d.alterb9]],
		['C13(b9,#9)', 'C', '13', 'dominant-13th', [d.alterb9, d.alterx9]],
		['C13(b9,#11)', 'C', '13', 'dominant-13th', [d.alterb9, d.alterx11]],
		['C13(b9,#9,#11)', 'C', '13', 'dominant-13th', [d.alterb9, d.alterx9, d.alterx11]],
		['C13(#9)', 'C', '13', 'dominant-13th', [d.alterx9]],
		['C13(#9,#11)', 'C', '13', 'dominant-13th', [d.alterx9, d.alterx11]],
		['C13(#11)', 'C', '13', 'dominant-13th', [d.alterx11]],
		['Cdim', 'C', 'dim', 'diminished', []],
		['Cdim7', 'C', 'dim7', 'diminished-seventh', []],
		['Cdim7(add ma7)', 'C', 'dim7', 'diminished-seventh', [d.addma7]],
		['Cdim7(add ma7,9)', 'C', 'dim7', 'diminished-seventh', [d.addma7, d.add9]],
		['Cdim7(add ma7,9,11)', 'C', 'dim7', 'diminished-seventh', [d.addma7, d.add9, d.add11]],
		['Cdim7(add ma7,9,11,b13)', 'C', 'dim7', 'diminished-seventh', [d.addma7, d.add9, d.add11, d.addb13]],
		['Cdim7(add ma7,11)', 'C', 'dim7', 'diminished-seventh', [d.addma7, d.add11]],
		['Cdim7(add ma7,11,b13)', 'C', 'dim7', 'diminished-seventh', [d.addma7, d.add11, d.addb13]],
		['Cdim7(add ma7,9,b13)', 'C', 'dim7', 'diminished-seventh', [d.addma7, d.add9, d.addb13]],
		['Cdim7(add ma7,b13)', 'C', 'dim7', 'diminished-seventh', [d.addma7, d.addb13]],
		['Cdim7(add 9)', 'C', 'dim7', 'diminished-seventh', [d.add9]],
		['Cdim7(add 9,11)', 'C', 'dim7', 'diminished-seventh', [d.add9, d.add11]],
		['Cdim7(add 9,11,b13)', 'C', 'dim7', 'diminished-seventh', [d.add9, d.add11, d.addb13]],
		['Cdim7(add 9,b13)', 'C', 'dim7', 'diminished-seventh', [d.add9, d.addb13]],
		['Cdim7(add 11)', 'C', 'dim7', 'diminished-seventh', [d.add11]],
		['Cdim7(add 11,b13)', 'C', 'dim7', 'diminished-seventh', [d.add11, d.addb13]],
		['Cdim7(add b13)', 'C', 'dim7', 'diminished-seventh', [d.addb13]],

		// Chords symbols from: The New Real Book vol1

		['C bass', 'C', ' bass', 'other'],
		['C', 'C', '', 'major'],
		['CSUS', 'C', 'sus4', 'suspended-fourth'],
		['C+', 'C', '+', 'augmented'],
		['C6', 'C', '6', 'major-sixth'],
		['C6/9', 'C', '69', 'major-sixth', [d.add9]],
		['CMA7(b5)', 'C', 'ma7', 'major-seventh', [d.alterb5]],
		['C#MA7SUS(b5)', 'C', 'ma7sus', 'major-seventh', [d.omit3, d.add4, d.alterb5]],
		['CMA7', 'C', 'ma7', 'major-seventh'],
		['CMA7(#5)', 'C', 'ma7', 'major-seventh', [d.alterx5]],
		['CMA7(#11)', 'C', 'ma7', 'major-seventh', [d.alterx11]],
		['C(add 9,omit 3)', 'C', 'sus2', 'suspended-second'],
		['C(add 9)', 'C', '', 'major', [d.add9]],
		['CMA9', 'C', 'ma9', 'major-ninth'],
		['CMA9(#11)', 'C', 'ma9', 'major-ninth', [d.alterx11]],
		['CMA7(add 13)', 'C', 'ma7', 'major-seventh', [d.add13]],
		['CMA13', 'C', 'ma13', 'major-13th'],
		['CMA13(#11)', 'C', 'ma13', 'major-13th', [d.alterx11]],
		['Bb(add 9,add b13)', 'B', '', 'major', [d.add9, d.alterb13]],
		['A+(add b9,add #9)', 'A', '+', 'augmented', [d.addb9, d.addx9]],
		['CMI7', 'C', 'mi7', 'minor-seventh'],
		['CMI7(omit 5)', 'C', 'mi7', 'minor-seventh', [d.omit5]],
		['CMI9', 'C', 'mi9', 'minor-ninth'],
		['CMI11', 'C', 'mi11', 'minor-11th'],
		['CMI7(add 11)', 'C', 'mi7', 'minor-seventh', [d.add11]],
		['CMI13', 'C', 'mi13', 'minor-13th'],
		['CMI7(add 13)', 'C', 'mi7', 'minor-seventh', [d.add13]],
		['G#MI7(add 11, omit 5)', 'G', 'mi7', 'minor-seventh', [d.omit5, d.add11]],
		['Cdim.', 'C', 'dim', 'diminished'],
		['CMI7(b5)', 'C', 'ø', 'half-diminished'],
		['CMI9(b5)', 'C', 'mi9', 'minor-ninth', [d.alterb5]],
		['CMI11(b5)', 'C', 'mi11', 'minor-11th', [d.alterb5]],
		['CMI', 'C', 'mi', 'minor', []],
		['CMI6', 'C', 'mi6', 'minor-sixth', []],
		['CMI(MA7)', 'C', 'miMa7', 'major-minor', []],
		['CMI(add9)', 'C', 'mi', 'minor', [d.add9]],
		['CMI6/9', 'C', 'mi69', 'minor-sixth', [d.add9]],
		['C7', 'C', '7', 'dominant', []],
		['C7(omit 3)', 'C', '7', 'dominant', [d.omit3]],
		['C9', 'C', '9', 'dominant-ninth', []],
		['C13', 'C', '13', 'dominant-13th', []],
		['C7SUS', 'C', '7sus', 'dominant', [d.omit3, d.add4]],
		['F#7SUS(add 3)', 'F', '7sus', 'dominant', [d.add3, d.add4]],
		['C9SUS', 'C', '9sus', 'dominant-ninth', [d.omit3, d.add4]],
		['C13SUS', 'C', '13sus', 'dominant-13th', [d.omit3, d.add4]],
		['C7(b5)', 'C', '7', 'dominant', [d.alterb5]],
		['C7(b5,b9)', 'C', '7', 'dominant', [d.alterb5, d.alterb9]],
		['C9(b5)', 'C', '9', 'dominant-ninth', [d.alterb5]],
		['C13(b5)', 'C', '13', 'dominant-13th', [d.alterb5]],
		['C7(#11)', 'C', '7', 'dominant', [d.alterx11]],
		['C9(#11)', 'C', '9', 'dominant-ninth', [d.alterx11]],
		['C13(#11)', 'C', '13', 'dominant-13th', [d.alterx11]],
		['C7(b9)', 'C', '7', 'dominant', [d.alterb9]],
		['C7(#9)', 'C', '7', 'dominant', [d.alterx9]],
		['C7(b9,#11)', 'C', '7', 'dominant', [d.alterb9, d.alterx11]],
		['C7(#9,#11)', 'C', '7', 'dominant', [d.alterx9, d.alterx11]],
		['C7SUS(b9)', 'C', '7sus', 'dominant', [d.omit3, d.add4, d.alterb9]],
		['C13SUS(b9)', 'C', '13sus', 'dominant-13th', [d.omit3, d.add4, d.alterb9]],
		['C13(b9)', 'C', '13', 'dominant-13th', [d.alterb9]],
		['C13(#11)', 'C', '13', 'dominant-13th', [d.alterx11]],
		['C7(#5)', 'C', '+7', 'augmented-seventh', []],
		['C7(#5,b9)', 'C', '7', 'dominant', [d.alterx5, d.alterb9]],
		['C7(#5,#9)', 'C', '7', 'dominant', [d.alterx5, d.alterx9]],
		['C9(#5)', 'C', '9', 'dominant-ninth', [d.alterx5]],
		['C°7', 'C', 'dim7', 'diminished-seventh'],
		['C°7(add MA7)', 'C', 'dim7', 'diminished-seventh', [d.addma7]],
		['C/E', 'C', '', 'major', [], 'E'],
		['C/G', 'C', '', 'major', [], 'G'],
		['E/C', 'E', '', 'major', [], 'C'],
		['Bb/C', 'B', '', 'major', [], 'C'],
		['C(add 9)/E', 'C', '', 'major', [d.add9], 'E'],
		['F/F#', 'F', '', 'major', [], 'F'],
		['E+/G', 'E', '+', 'augmented', [], 'G'],
		['G7SUS/A', 'G', '7sus', 'dominant', [d.omit3, d.add4], 'A'],
		['GMA7(#5)/F#', 'G', 'ma7', 'major-seventh', [d.alterx5], 'F'],
		['EbMA7(#5)/F', 'E', 'ma7', 'major-seventh', [d.alterx5], 'F'],
		['BMA7SUS/F#', 'B', 'ma7sus', 'major-seventh', [d.omit3, d.add4], 'F'],
	]
)('%s', (symbol, rootNote, kindText, kind, allDegrees = [], bassNote) => {
	const parseChord = chordParserFactory();
	const parsed = parseChord(symbol);
	const filtered = musicXmlRenderer(parsed);
	const musicxml = filtered.musicxml;

	test('contains a `harmony` array', () => {
		expect(typeof musicxml).toBe('object');
		expect(musicxml._name).toBe('harmony');
		expect(Array.isArray(musicxml._content)).toBe(true);
		expect(musicxml._content.length).toBeGreaterThan(1);
	});

	test('should detect root note', () => {
		const rootXml = musicxml._content.find((el) => el._name === 'root');
		expect(rootXml._content[0]._content).toBe(rootNote);
	});

	test('should detect bass note', () => {
		const bassXml = musicxml._content.find((el) => el._name === 'bass');
		const bassXmlNote = bassXml ? bassXml._content[0]._content : undefined;
		expect(bassXmlNote).toBe(bassNote);
	});

	test('should detect correct kind', () => {
		const kindXml = musicxml._content.find((el) => el._name === 'kind');
		expect(kindXml._attrs.text).toBe(kindText);
		expect(kindXml._content).toBe(kind);
	});

	// fixme: a bit cumbersome?
	test('should detect degrees', () => {
		let assertionsCount = 1 + allDegrees.length * 3;
		expect.assertions(assertionsCount);

		const allDegreesXml = musicxml._content.filter(
			(el) => el._name === 'degree'
		);
		expect(allDegreesXml.length).toEqual(allDegrees.length);

		allDegrees.forEach((degree, i) => {
			const { value, alter, type } = degree;

			const degreeXml = allDegreesXml[i];

			const valueXml = degreeXml._content.find(
				(el) => el._name === 'degree-value'
			);
			expect(valueXml._content).toEqual(value);

			const alterXml = degreeXml._content.find(
				(el) => el._name === 'degree-alter'
			);
			expect((alterXml || {})._content).toEqual(alter);

			const typeXml = degreeXml._content.find(
				(el) => el._name === 'degree-type'
			);
			expect(typeXml._content).toEqual(type);
		});
	});

	test('the filter should produce an harmony element describing the same intervals than chord-symbol', () => {
		const kindXml = musicxml._content.find((el) => el._name === 'kind');
		const kindValue = kindXml._content;

		const allHarmonyDegrees = getDegreesAsObjects(musicxml);

		const harmonyIntervals = harmonyToIntervals(
			kindValue,
			allHarmonyDegrees
		);

		expect(harmonyIntervals).toEqual(parsed.normalized.intervals);
	});
});
