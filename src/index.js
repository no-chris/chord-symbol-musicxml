import { hasExactly } from '../../chord-symbol/src/helpers/hasElement'; //fixme

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

	const harmonyElement = [];

	harmonyElement.push(getNote('root', chord.formatted.rootNote));
	harmonyElement.push(getKind(musicXmlKind, musicXmlKindText));

	if (chord.formatted.bassNote) {
		harmonyElement.push(getNote('bass', chord.formatted.bassNote));
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
		// Generic case
		musicXmlKind = getMusicXmlKind(chord);
		musicXmlKindText = chord.formatted.descriptor;

		allDegrees = getAllDegrees(musicXmlKind, chord);

		if (chord.normalized.isSuspended) {
			if (!chord.normalized.adds.includes('3')) {
				allDegrees.push(getDegree('subtract', '3', false));
			}
			if (!chord.normalized.intents.eleventh) {
				allDegrees.push(getDegree('add', '4', false));
			}
		}

		if (musicXmlKind === 'major-minor' && isExtended(chord)) {
			chord.normalized.extensions.forEach((el) =>
				allDegrees.push(getDegree('add', el, false))
			);
		}
	}

	allDegrees.sort((a, b) => {
		return a._content[0]._content - b._content[0]._content;
	});

	return { musicXmlKind, musicXmlKindText, allDegrees };
};

const getMusicXmlKind = (chord) => {
	let musicXmlKind;

	const { quality } = chord.normalized;

	if (quality === 'dominant7') {
		musicXmlKind = isExtended(chord)
			? 'dominant-' + getHighestExtension(chord)
			: 'dominant';
	} else if (quality === 'major7') {
		musicXmlKind = isExtended(chord)
			? 'major-' + getHighestExtension(chord)
			: 'major-seventh';
	} else if (quality === 'minor7') {
		musicXmlKind = isExtended(chord)
			? 'minor-' + getHighestExtension(chord)
			: 'minor-seventh';
	} else {
		const qualityToKind = {
			major: 'major',
			minor: 'minor',
			augmented: 'augmented',
			diminished: 'diminished',
			minorMajor7: 'major-minor',
			diminished7: 'diminished-seventh',
			major6: 'major-sixth',
			minor6: 'minor-sixth',
			power: 'power',
			bass: 'other',
		};

		musicXmlKind = qualityToKind[chord.normalized.quality];
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

const getAllDegrees = (kind, chord) => {
	const allDegrees = [];

	chord.normalized.adds.forEach((add) => {
		const printObject = !(
			add === '9' && ['major-sixth', 'minor-sixth'].includes(kind)
		);
		allDegrees.push(getDegree('add', add, printObject));
	});

	chord.normalized.alterations.forEach((alteration) => {
		const printObject = !chord.normalized.intents.alt;
		allDegrees.push(getDegree('alter', alteration, printObject));
	});

	chord.normalized.omits.forEach((omit) => {
		allDegrees.push(getDegree('subtract', omit));
	});

	return allDegrees;
};

export default musicXmlRenderer;
