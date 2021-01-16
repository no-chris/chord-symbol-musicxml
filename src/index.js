import { hasExactly } from '../../chord-symbol/src/helpers/hasElement';

import kindToIntervals from './kindToIntervals';
import {
	getNote,
	getKind,
	getHarmony,
	getDegree,
} from './helpers/harmonyHelpers';

/**
 * @param {Chord} chord
 * @returns {Chord}
 */
const musicXmlRenderer = (chord) => {
	const {
		musicXmlKind,
		musicXmlKindText,
		allDegrees,
	} = getMusicXmlKindAndDegrees(chord);

	const harmonyElement = [
		getNote('root', chord.formatted.rootNote),
		getKind(musicXmlKind, musicXmlKindText),
	];

	if (chord.formatted.bassNote) {
		const bassNote = getNote('bass', chord.formatted.bassNote);
		harmonyElement.push(bassNote);
	}

	if (allDegrees.length) {
		harmonyElement.push(...allDegrees);
	}

	chord.musicxml = getHarmony(harmonyElement);

	return chord;
};

const getMusicXmlKindAndDegrees = (chord) => {
	let musicXmlKind;
	let musicXmlKindText;
	let allDegrees = [];

	const { intervals } = chord.normalized;

	// handle special cases first:
	if (hasExactly(intervals, kindToIntervals['half-diminished'])) {
		musicXmlKind = 'half-diminished';
		musicXmlKindText = 'ø';
	} else if (hasExactly(intervals, kindToIntervals['augmented-seventh'])) {
		musicXmlKind = 'augmented-seventh';
		musicXmlKindText = '+7';
	} else if (hasExactly(intervals, kindToIntervals['suspended-second'])) {
		musicXmlKind = 'suspended-second';
		musicXmlKindText = 'sus2';
	} else if (hasExactly(intervals, kindToIntervals['suspended-fourth'])) {
		musicXmlKind = 'suspended-fourth';
		musicXmlKindText = 'sus4';
	} else {
		musicXmlKind = getMusicXmlKind(chord);
		musicXmlKindText = chord.formatted.descriptor;

		allDegrees = getAllDegrees(
			musicXmlKind,
			chord.normalized.adds,
			chord.normalized.alterations,
			chord.normalized.omits
		);

		if (chord.normalized.isSuspended) {
			if (!chord.normalized.adds.includes('3')) {
				allDegrees.push(getDegree('subtract', '3', false));
			}
			allDegrees.push(getDegree('add', '4', false));
		}
	}

	allDegrees.sort((a, b) => {
		return a._content[0]._content - b._content[0]._content;
	});

	return { musicXmlKind, musicXmlKindText, allDegrees };
};

const getMusicXmlKind = (chord) => {
	let musicXmlKind;

	switch (chord.normalized.quality) {
		case 'major':
		case 'minor':
		case 'augmented':
		case 'diminished':
		case 'power':
			musicXmlKind = chord.normalized.quality;
			break;
		case 'major6':
		case 'minor6':
			musicXmlKind = chord.normalized.quality.replace('6', '-sixth');
			break;
		case 'dominant7':
			musicXmlKind = 'dominant';
			if (isExtended(chord)) {
				musicXmlKind += '-' + getHighestExtension(chord);
			}
			break;
		case 'major7':
			musicXmlKind = 'major-';
			musicXmlKind += isExtended(chord)
				? getHighestExtension(chord)
				: 'seventh';
			break;
		case 'minor7':
			musicXmlKind = 'minor-';
			musicXmlKind += isExtended(chord)
				? getHighestExtension(chord)
				: 'seventh';
			break;
		case 'diminished7':
			musicXmlKind = 'diminished-seventh';
			break;
		case 'minorMajor7':
			musicXmlKind = 'major-minor';
			break;
		case 'bass':
			musicXmlKind = 'other';
			break;
	}
	return musicXmlKind;
};

const isExtended = (chord) => {
	return chord.normalized.extensions.length > 0;
};

const getHighestExtension = (chord) => {
	const highestExtension =
		chord.normalized.extensions[chord.normalized.extensions.length - 1];

	const extensionMap = {
		9: 'ninth',
		11: '11th',
		13: '13th',
	};

	return extensionMap[highestExtension];
};

const getAllDegrees = (kind, adds, alterations, omits) => {
	const allDegrees = [];

	adds.forEach((add) => {
		const printObject = !(
			add === '9' && ['major-sixth', 'minor-sixth'].includes(kind)
		);
		allDegrees.push(getDegree('add', add, printObject));
	});

	alterations.forEach((alteration) => {
		allDegrees.push(getDegree('alter', alteration));
	});

	omits.forEach((omit) => {
		allDegrees.push(getDegree('subtract', omit));
	});

	return allDegrees;
};

export default musicXmlRenderer;
