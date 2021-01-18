import { chordParserFactory } from '../../chord-symbol/src/index';

import musicXmlRenderer from '../src/index';
import harmonyToIntervals from '../src/helpers/harmonyToIntervals';
import {
	getDegreesAsObjects,
	formatDegree,
} from './helpers/harmonyTestHelpers';

import d from './allDegrees';
import n from './allNotes';

describe.each(
	/* prettier-ignore */
	[

		/**/
		/**/

		// Chords symbols from: Contemporary Music Theory

		['C5', n.C, '5', 'power'],
		['C(omit3)', n.C, '5', 'power'],
		['Csus', n.C, 'sus4', 'suspended-fourth'],
		['C(b5)', n.C, '', 'major', [d.alterb5]],
		['C', n.C, '', 'major'],
		['C+', n.C, '+', 'augmented'],
		['C6(b5)', n.C, '6', 'major-sixth', [d.alterb5]],
		['C6', n.C, '6', 'major-sixth'],
		['C6(#5)', n.C, '6', 'major-sixth', [d.alterx5]],
		['C69', n.C, '69', 'major-sixth', [d.add9], ['9']],
		['C69(#11)', n.C, '69', 'major-sixth', [d.add9, d.alterx11], ['9']],
		['Cma6(b5)', n.C, '6', 'major-sixth', [d.alterb5]],
		['Cma6', n.C, '6', 'major-sixth'],
		['Cma69', n.C, '69', 'major-sixth', [d.add9], ['9']],
		['Cma6(#5)', n.C, '6', 'major-sixth', [d.alterx5]],
		['Cma7(b5)', n.C, 'ma7', 'major-seventh', [d.alterb5]],
		['Cma7', n.C, 'ma7', 'major-seventh'],
		['Cma7(#5)', n.C, 'ma7', 'major-seventh', [d.alterx5]],
		['Cadd9(omit3)', n.C, 'sus2', 'suspended-second'],
		['Cadd9(no3)', n.C, 'sus2', 'suspended-second'],
		['Cadd9', n.C, '', 'major', [d.add9]],
		['C(add9)', n.C, '', 'major', [d.add9]],
		['Cma9', n.C, 'ma9', 'major-ninth'],
		['Cma9(no3)', n.C, 'ma9', 'major-ninth', [d.omit3]],
		['Cma9(#11)', n.C, 'ma9', 'major-ninth', [d.alterx11]],
		['Cma9(omit3)', n.C, 'ma9', 'major-ninth', [d.omit3]],
		['Cma13', n.C, 'ma13', 'major-13th'],
		['Cma13(#11)', n.C, 'ma13', 'major-13th', [d.alterx11]],
		['C°', n.C, 'dim', 'diminished'],
		['Cmi', n.C, 'mi', 'minor'],
		['Cmi add9', n.C, 'mi', 'minor', [d.add9]],
		['Cmi(add9)', n.C, 'mi', 'minor', [d.add9]],
		['Cmi6', n.C, 'mi6', 'minor-sixth'],
		['Cmi69', n.C, 'mi69', 'minor-sixth', [d.add9], ['9']],
		['Cmi69(add11)', n.C, 'mi69', 'minor-sixth', [d.add9, d.add11], ['9']],
		['Cmi(#5)', n.C, 'mi', 'minor', [d.alterx5]],
		['Cmi7', n.C, 'mi7', 'minor-seventh'],
		['Cmi7(b5)', n.C, 'ø', 'half-diminished'],
		['Cmi7(#5)', n.C, 'mi7', 'minor-seventh', [d.alterx5]],
		['Cmi7(b5,#5)', n.C, 'mi7', 'minor-seventh', [d.alterb5, d.alterx5]],
		['Cmi7(b5,add11)', n.C, 'mi7', 'minor-seventh', [d.alterb5, d.add11]],
		['Cmi7(add11)', n.C, 'mi7', 'minor-seventh', [d.add11]],
		['Cmi9', n.C, 'mi9', 'minor-ninth'],
		['Cmi9(b5)', n.C, 'mi9', 'minor-ninth', [d.alterb5]],
		['Cmi11', n.C, 'mi11', 'minor-11th'],
		['Cmi11(b5)', n.C, 'mi11', 'minor-11th', [d.alterb5]],
		['Cmi11(b5,no3)', n.C, 'mi11', 'minor-11th', [d.omitb3, d.alterb5]],
		['Cmi11(b5,#5)', n.C, 'mi11', 'minor-11th', [d.alterb5, d.alterx5]],
		['Cmi11(b5,b13)', n.C, 'mi11', 'minor-11th', [d.alterb5, d.alterb13]],
		['Cmi13', n.C, 'mi13', 'minor-13th'],
		['CmiMa7', n.C, 'miMa7', 'major-minor'],
		['CmiMa9', n.C, 'miMa9', 'major-minor', [d.add9], ['9']],
		['CmiMa9(add13)', n.C, 'miMa9', 'major-minor', [d.add9, d.add13], ['9']],
		['CmiMa11', n.C, 'miMa11', 'major-minor', [d.add9, d.add11], ['9', '11']],
		['CmiMa13', n.C, 'miMa13', 'major-minor', [d.add9, d.add11, d.add13], ['9', '11', '13']],
		['C7', n.C, '7', 'dominant'],
		['C7sus', n.C, '7sus', 'dominant', [d.omit3, d.add4], ['3', '4']],
		['C7sus(b9)', n.C, '7sus', 'dominant', [d.omit3, d.add4, d.alterb9], ['3', '4']],
		['C7(b5)', n.C, '7', 'dominant', [d.alterb5]],
		['C7(b5,#5)', n.C, '7', 'dominant', [d.alterb5, d.alterx5]],
		['C7(b5,#5,b9)', n.C, '7', 'dominant', [d.alterb5, d.alterx5, d.alterb9]],
		['C7(b5,#5,#9)', n.C, '7', 'dominant', [d.alterb5, d.alterx5, d.alterx9]],
		['C7(b5,#5,b9,#9)', n.C, '7', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9]],
		['C7(b5,#5,b9,#9,b13)', n.C, '7', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9, d.alterb13]],
		['C7(b5,b9)', n.C, '7', 'dominant', [d.alterb5, d.alterb9]],
		['C7(b5,b9,#9)', n.C, '7', 'dominant', [d.alterb5, d.alterb9, d.alterx9]],
		['C7(b5,b9,b13)', n.C, '7', 'dominant', [d.alterb5, d.alterb9, d.alterb13]],
		['C7(b5,#9)', n.C, '7', 'dominant', [d.alterb5, d.alterx9]],
		['C7(b5,#9,b13)', n.C, '7', 'dominant', [d.alterb5, d.alterx9, d.alterb13]],
		['C7(b5,b13)', n.C, '7', 'dominant', [d.alterb5, d.alterb13]],
		['C7(#5)', n.C, '+7', 'augmented-seventh'],
		['C7(#5,b9)', n.C, '7', 'dominant', [d.alterx5, d.alterb9]],
		['C7(#5,#9)', n.C, '7', 'dominant', [d.alterx5, d.alterx9]],
		['C7(#5,b9,#9)', n.C, '7', 'dominant', [d.alterx5, d.alterb9, d.alterx9]],
		['C7(#5,b9,#11)', n.C, '7', 'dominant', [d.alterx5, d.alterb9, d.alterx11]],
		['C7(#5,#9,#11)', n.C, '7', 'dominant', [d.alterx5, d.alterx9, d.alterx11]],
		['C7(#5,b9,#9,#11)', n.C, '7', 'dominant', [d.alterx5, d.alterb9, d.alterx9, d.alterx11]],
		['C7(#5, #11)', n.C, '7', 'dominant', [d.alterx5, d.alterx11]],
		['C7(b9)', n.C, '7', 'dominant', [d.alterb9]],
		['C7(b9,#9)', n.C, '7', 'dominant', [d.alterb9, d.alterx9]],
		['C7(b9,#11)', n.C, '7', 'dominant', [d.alterb9, d.alterx11]],
		['C7(b9,#9,#11)', n.C, '7', 'dominant', [d.alterb9, d.alterx9, d.alterx11]],
		['C7(b9,#9,b13)', n.C, '7', 'dominant', [d.alterb9, d.alterx9, d.alterb13]],
		['C7(b9,#9,#11,b13)', n.C, '7', 'dominant', [d.alterb9, d.alterx9, d.alterx11, d.alterb13]],
		['C7(b9,#11,b13)', n.C, '7', 'dominant', [d.alterb9, d.alterx11, d.alterb13]],
		['C7(b9,b13)', n.C, '7', 'dominant', [d.alterb9, d.alterb13]],
		['C7(#9)', n.C, '7', 'dominant', [d.alterx9]],
		['C7(#9,#11)', n.C, '7', 'dominant', [d.alterx9, d.alterx11]],
		['C7(#9,b13)', n.C, '7', 'dominant', [d.alterx9, d.alterb13]],
		['C7(#9,#11,b13)', n.C, '7', 'dominant', [d.alterx9, d.alterx11, d.alterb13]],
		['C7(#11)', n.C, '7', 'dominant', [d.alterx11]],
		['C7(#11,b13)', n.C, '7', 'dominant', [d.alterx11, d.alterb13]],
		['C7(b13)', n.C, '7', 'dominant', [d.alterb13]],
		['C9', n.C, '9', 'dominant-ninth'],
		['C9(13)', n.C, '13', 'dominant-13th'],
		['C9(add13)', n.C, '13', 'dominant-13th'],
		['C9sus', n.C, '9sus', 'dominant-ninth', [d.omit3, d.add4], ['3', '4']],
		['C9(b5)', n.C, '9', 'dominant-ninth', [d.alterb5]],
		['C9(b5,#5)', n.C, '9', 'dominant-ninth', [d.alterb5, d.alterx5]],
		['C9(b5,b13)', n.C, '9', 'dominant-ninth', [d.alterb5, d.alterb13]],
		['C9(#5,#11)', n.C, '9', 'dominant-ninth', [d.alterx5, d.alterx11]],
		['C9(#11)', n.C, '9', 'dominant-ninth', [d.alterx11]],
		['C9(#11,b13)', n.C, '9', 'dominant-ninth', [d.alterx11, d.alterb13]],
		['C11', n.C, '9sus', 'dominant-11th', [d.omit3], ['3']],
		['C11(b9)', n.C, '7sus', 'dominant-11th', [d.omit3, d.alterb9], ['3']],
		['C13', n.C, '13', 'dominant-13th'],
		['C13sus', n.C, '13sus', 'dominant-13th', [d.omit3, d.add4], ['3', '4']],
		['C13(b5)', n.C, '13', 'dominant-13th', [d.alterb5]],
		['C13(b5,b9)', n.C, '13', 'dominant-13th', [d.alterb5, d.alterb9]],
		['C13(b5,#9)', n.C, '13', 'dominant-13th', [d.alterb5, d.alterx9]],
		['C13(b5,b9,#9)', n.C, '13', 'dominant-13th', [d.alterb5, d.alterb9, d.alterx9]],
		['C13(b9)', n.C, '13', 'dominant-13th', [d.alterb9]],
		['C13(b9,#9)', n.C, '13', 'dominant-13th', [d.alterb9, d.alterx9]],
		['C13(b9,#11)', n.C, '13', 'dominant-13th', [d.alterb9, d.alterx11]],
		['C13(b9,#9,#11)', n.C, '13', 'dominant-13th', [d.alterb9, d.alterx9, d.alterx11]],
		['C13(#9)', n.C, '13', 'dominant-13th', [d.alterx9]],
		['C13(#9,#11)', n.C, '13', 'dominant-13th', [d.alterx9, d.alterx11]],
		['C13(#11)', n.C, '13', 'dominant-13th', [d.alterx11]],
		['Cdim', n.C, 'dim', 'diminished'],
		['Cdim7', n.C, 'dim7', 'diminished-seventh'],
		['Cdim7(add ma7)', n.C, 'dim7', 'diminished-seventh', [d.addma7]],
		['Cdim7(add ma7,9)', n.C, 'dim7', 'diminished-seventh', [d.addma7, d.add9]],
		['Cdim7(add ma7,9,11)', n.C, 'dim7', 'diminished-seventh', [d.addma7, d.add9, d.add11]],
		['Cdim7(add ma7,9,11,b13)', n.C, 'dim7', 'diminished-seventh', [d.addma7, d.add9, d.add11, d.addb13]],
		['Cdim7(add ma7,11)', n.C, 'dim7', 'diminished-seventh', [d.addma7, d.add11]],
		['Cdim7(add ma7,11,b13)', n.C, 'dim7', 'diminished-seventh', [d.addma7, d.add11, d.addb13]],
		['Cdim7(add ma7,9,b13)', n.C, 'dim7', 'diminished-seventh', [d.addma7, d.add9, d.addb13]],
		['Cdim7(add ma7,b13)', n.C, 'dim7', 'diminished-seventh', [d.addma7, d.addb13]],
		['Cdim7(add 9)', n.C, 'dim7', 'diminished-seventh', [d.add9]],
		['Cdim7(add 9,11)', n.C, 'dim7', 'diminished-seventh', [d.add9, d.add11]],
		['Cdim7(add 9,11,b13)', n.C, 'dim7', 'diminished-seventh', [d.add9, d.add11, d.addb13]],
		['Cdim7(add 9,b13)', n.C, 'dim7', 'diminished-seventh', [d.add9, d.addb13]],
		['Cdim7(add 11)', n.C, 'dim7', 'diminished-seventh', [d.add11]],
		['Cdim7(add 11,b13)', n.C, 'dim7', 'diminished-seventh', [d.add11, d.addb13]],
		['Cdim7(add b13)', n.C, 'dim7', 'diminished-seventh', [d.addb13]],

		// Chords symbols from: The New Real Book vol1

		['C bass', n.C, ' bass', 'other'],
		['C', n.C, '', 'major'],
		['CSUS', n.C, 'sus4', 'suspended-fourth'],
		['C+', n.C, '+', 'augmented'],
		['C6', n.C, '6', 'major-sixth'],
		['C6/9', n.C, '69', 'major-sixth', [d.add9], ['9']],
		['CMA7(b5)', n.C, 'ma7', 'major-seventh', [d.alterb5]],
		['C#MA7SUS(b5)', n['C#'], 'ma7sus', 'major-seventh', [d.omit3, d.add4, d.alterb5], ['3', '4']],
		['CMA7', n.C, 'ma7', 'major-seventh'],
		['CMA7(#5)', n.C, 'ma7', 'major-seventh', [d.alterx5]],
		['CMA7(#11)', n.C, 'ma7', 'major-seventh', [d.alterx11]],
		['C(add 9,omit 3)', n.C, 'sus2', 'suspended-second'],
		['C(add 9)', n.C, '', 'major', [d.add9]],
		['CMA9', n.C, 'ma9', 'major-ninth'],
		['CMA9(#11)', n.C, 'ma9', 'major-ninth', [d.alterx11]],
		['CMA7(add 13)', n.C, 'ma7', 'major-seventh', [d.add13]],
		['CMA13', n.C, 'ma13', 'major-13th'],
		['CMA13(#11)', n.C, 'ma13', 'major-13th', [d.alterx11]],
		['Bb(add 9,add b13)', n.Bb, '', 'major', [d.add9, d.alterb13]],
		['A+(add b9,add #9)', n.A, '+', 'augmented', [d.addb9, d.addx9]],
		['CMI7', n.C, 'mi7', 'minor-seventh'],
		['CMI7(omit 5)', n.C, 'mi7', 'minor-seventh', [d.omit5]],
		['CMI9', n.C, 'mi9', 'minor-ninth'],
		['CMI11', n.C, 'mi11', 'minor-11th'],
		['CMI7(add 11)', n.C, 'mi7', 'minor-seventh', [d.add11]],
		['CMI13', n.C, 'mi13', 'minor-13th'],
		['CMI7(add 13)', n.C, 'mi7', 'minor-seventh', [d.add13]],
		['G#MI7(add 11, omit 5)', n['G#'], 'mi7', 'minor-seventh', [d.omit5, d.add11]],
		['Cdim.', n.C, 'dim', 'diminished'],
		['CMI7(b5)', n.C, 'ø', 'half-diminished'],
		['CMI9(b5)', n.C, 'mi9', 'minor-ninth', [d.alterb5]],
		['CMI11(b5)', n.C, 'mi11', 'minor-11th', [d.alterb5]],
		['CMI', n.C, 'mi', 'minor'],
		['CMI6', n.C, 'mi6', 'minor-sixth'],
		['CMI(MA7)', n.C, 'miMa7', 'major-minor'],
		['CMI(add9)', n.C, 'mi', 'minor', [d.add9]],
		['CMI6/9', n.C, 'mi69', 'minor-sixth', [d.add9], ['9']],
		['C7', n.C, '7', 'dominant'],
		['C7(omit 3)', n.C, '7', 'dominant', [d.omit3]],
		['C9', n.C, '9', 'dominant-ninth'],
		['C13', n.C, '13', 'dominant-13th'],
		['C7SUS', n.C, '7sus', 'dominant', [d.omit3, d.add4], ['3', '4']],
		['F#7SUS(add 3)', n['F#'], '7sus', 'dominant', [d.add3, d.add4], ['4']],
		['C9SUS', n.C, '9sus', 'dominant-ninth', [d.omit3, d.add4], ['3', '4']],
		['C13SUS', n.C, '13sus', 'dominant-13th', [d.omit3, d.add4], ['3', '4']],
		['C7(b5)', n.C, '7', 'dominant', [d.alterb5]],
		['C7(b5,b9)', n.C, '7', 'dominant', [d.alterb5, d.alterb9]],
		['C9(b5)', n.C, '9', 'dominant-ninth', [d.alterb5]],
		['C13(b5)', n.C, '13', 'dominant-13th', [d.alterb5]],
		['C7(#11)', n.C, '7', 'dominant', [d.alterx11]],
		['C9(#11)', n.C, '9', 'dominant-ninth', [d.alterx11]],
		['C13(#11)', n.C, '13', 'dominant-13th', [d.alterx11]],
		['C7(b9)', n.C, '7', 'dominant', [d.alterb9]],
		['C7(#9)', n.C, '7', 'dominant', [d.alterx9]],
		['C7(b9,#11)', n.C, '7', 'dominant', [d.alterb9, d.alterx11]],
		['C7(#9,#11)', n.C, '7', 'dominant', [d.alterx9, d.alterx11]],
		['C7SUS(b9)', n.C, '7sus', 'dominant', [d.omit3, d.add4, d.alterb9], ['3', '4']],
		['C13SUS(b9)', n.C, '13sus', 'dominant-13th', [d.omit3, d.add4, d.alterb9], ['3', '4']],
		['C13(b9)', n.C, '13', 'dominant-13th', [d.alterb9]],
		['C13(#11)', n.C, '13', 'dominant-13th', [d.alterx11]],
		['C7(#5)', n.C, '+7', 'augmented-seventh'],
		['C7(#5,b9)', n.C, '7', 'dominant', [d.alterx5, d.alterb9]],
		['C7(#5,#9)', n.C, '7', 'dominant', [d.alterx5, d.alterx9]],
		['C9(#5)', n.C, '9', 'dominant-ninth', [d.alterx5]],
		['C°7', n.C, 'dim7', 'diminished-seventh'],
		['C°7(add MA7)', n.C, 'dim7', 'diminished-seventh', [d.addma7]],
		['C/E', n.C, '', 'major', [], [], n.E],
		['C/G', n.C, '', 'major', [], [], n.G],
		['E/C', n.E, '', 'major', [], [], n.C],
		['Bb/C', n.Bb, '', 'major', [], [], n.C],
		['C(add 9)/E', n.C, '', 'major', [d.add9], [], n.E],
		['F/F#', n.F, '', 'major', [], [], n['F#']],
		['E+/G', n.E, '+', 'augmented', [], [], n.G],
		['G7SUS/A', n.G, '7sus', 'dominant', [d.omit3, d.add4], ['3', '4'], n.A],
		['GMA7(#5)/F#', n.G, 'ma7', 'major-seventh', [d.alterx5], [], n['F#']],
		['EbMA7(#5)/F', n.Eb, 'ma7', 'major-seventh', [d.alterx5], [], n.F],
		['BMA7SUS/F#', n.B, 'ma7sus', 'major-seventh', [d.omit3, d.add4], ['3', '4'], n['F#']],

		// other chords symbols

		['C-b6', n.C, 'mi', 'minor', [d.addb6]],
		['C2', n.C, '', 'major', [d.add9]],
		['Csus2', n.C, 'sus2', 'suspended-second'],
		['C6(#9)', n.C, '6', 'major-sixth', [d.addx9]],
		['C6(b9)', n.C, '6', 'major-sixth', [d.addb9]],
		['Cø', n.C, 'ø', 'half-diminished'],
		['Cadd11', n.C, '', 'major', [d.add11]],
		['CΔ', n.C, 'ma7', 'major-seventh'],
		['C^', n.C, 'ma7', 'major-seventh'],
		['CmiMa7', n.C, 'miMa7', 'major-minor'],
		['Cmi^13', n.C, 'miMa13', 'major-minor', [d.add9, d.add11, d.add13], ['9', '11', '13']],
		['CmiΔ13', n.C, 'miMa13', 'major-minor', [d.add9, d.add11, d.add13], ['9', '11', '13']],
		['C^sus(b5)', n.C, 'ma7sus', 'major-seventh', [d.omit3, d.add4, d.alterb5], ['3', '4']],
		['CΔsus(b5)', n.C, 'ma7sus', 'major-seventh', [d.omit3, d.add4, d.alterb5], ['3', '4']],

		// altered chords

		['Calt', n.C, '7alt', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9, d.alterx11, d.alterb13], ['b5', '#5', 'b9', '#9', '#11', 'b13']],
		['Calt.', n.C, '7alt', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9, d.alterx11, d.alterb13], ['b5', '#5', 'b9', '#9', '#11', 'b13']],
		['Caltered', n.C, '7alt', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9, d.alterx11, d.alterb13], ['b5', '#5', 'b9', '#9', '#11', 'b13']],
		['C7alt', n.C, '7alt', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9, d.alterx11, d.alterb13], ['b5', '#5', 'b9', '#9', '#11', 'b13']],
		['C7alt.', n.C, '7alt', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9, d.alterx11, d.alterb13], ['b5', '#5', 'b9', '#9', '#11', 'b13']],
		['C7altered', n.C, '7alt', 'dominant', [d.alterb5, d.alterx5, d.alterb9, d.alterx9, d.alterx11, d.alterb13], ['b5', '#5', 'b9', '#9', '#11', 'b13']],

		/**/
		/**/
	]
)(
	'%s',
	(
		symbol,
		rootNote,
		kindText,
		kind,
		allDegrees = [],
		nonPrintableDegrees = [],
		bassNote = {}
	) => {
		const parseChord = chordParserFactory();
		const parsed = parseChord(symbol);

		const filtered = musicXmlRenderer(parsed);
		const musicxml = filtered.musicxml;
		const allHarmonyDegrees = getDegreesAsObjects(musicxml);

		test('contains a `harmony` array', () => {
			expect(typeof musicxml).toBe('object');
			expect(musicxml._name).toBe('harmony');
			expect(Array.isArray(musicxml._content)).toBe(true);
			expect(musicxml._content.length).toBeGreaterThan(1);
		});

		test('should detect root note', () => {
			const rootXml = musicxml._content.find((el) => el._name === 'root');
			expect(rootXml._content[0]._content).toBe(rootNote.step);
			expect((rootXml._content[1] || {})._content).toBe(rootNote.alter);
		});

		test('should detect bass note', () => {
			const bassXml = musicxml._content.find((el) => el._name === 'bass');
			const bassXmlStep = bassXml
				? bassXml._content[0]._content
				: undefined;
			const bassXmlAlter = bassXml
				? (bassXml._content[1] || {})._content
				: undefined;

			expect(bassXmlStep).toBe(bassNote.step);
			expect(bassXmlAlter).toBe(bassNote.alter);
		});

		test('should detect correct kind', () => {
			const kindXml = musicxml._content.find((el) => el._name === 'kind');
			expect(kindXml._attrs.text).toBe(kindText);
			expect(kindXml._content).toBe(kind);
		});

		test('should have the correct non printable intervals', () => {
			const actualNonPrintableDegrees = allHarmonyDegrees
				.filter((el) => el.printObject === 'no')
				.map(formatDegree);

			expect(actualNonPrintableDegrees).toEqual(nonPrintableDegrees);
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

			const harmonyIntervals = harmonyToIntervals(
				kindValue,
				allHarmonyDegrees
			);

			expect(harmonyIntervals).toEqual(parsed.normalized.intervals);
		});
	}
);
