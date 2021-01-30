import kindToIntervals from './kindToIntervals';

import { isEqual, hasOneOf } from './helpers/intervalHelpers';
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
	if (isEqual(intervals, kindToIntervals['half-diminished'])) {
		musicXmlKind = 'half-diminished';
		musicXmlKindText = 'ø';
	} else if (isEqual(intervals, kindToIntervals['augmented-seventh'])) {
		musicXmlKind = 'augmented-seventh';
		musicXmlKindText = '+7';
	} else if (isEqual(intervals, kindToIntervals['suspended-second'])) {
		musicXmlKind = 'suspended-second';
		musicXmlKindText = 'sus2';
	} else if (isEqual(intervals, kindToIntervals['suspended-fourth'])) {
		musicXmlKind = 'suspended-fourth';
		musicXmlKindText = 'sus4';
	} else {
		// Generic case
		musicXmlKind = getMusicXmlKind(chord);
		musicXmlKindText = chord.formatted.descriptor;

		allDegrees = getAllDegrees(musicXmlKind, chord);
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

const getAllDegrees = (musicxmlKind, chord) => {
	const allDegrees = [];
	const chordIntervals = normalizeIntervals(musicxmlKind, chord);
	const kindIntervals = [...kindToIntervals[musicxmlKind]];

	// adds & alts
	chordIntervals
		.filter((interval) => !kindIntervals.includes(interval))
		.forEach((interval) => {
			const unaltered = interval.replace(/[b#]/g, '');

			if (isAltered(interval) && kindIntervals.includes(unaltered)) {
				const printObject = !isAltChord(chord);
				allDegrees.push(getDegree('alter', interval, printObject));
			} else {
				const printObject = !(
					is9thIn69(interval, musicxmlKind) ||
					isExtensionInMiMa(interval, musicxmlKind, chord) ||
					is4thInSuspended(interval, chord) ||
					isAltChord(chord)
				);
				allDegrees.push(getDegree('add', interval, printObject));
			}
		});

	// omit3
	if (!hasThird(chordIntervals)) {
		const third = getThird(kindIntervals);
		if (third) {
			const printObject = !chord.normalized.isSuspended;
			allDegrees.push(getDegree('subtract', third, printObject));
		}
	}

	// omit5
	if (!hasFifth(chordIntervals) && kindIntervals.includes('5')) {
		allDegrees.push(getDegree('subtract', '5'));
	}

	// add3 edge case
	if (chord.normalized.adds.includes('3')) {
		allDegrees.push(getDegree('add', '3', true));
	}

	return allDegrees;
};

// Resolve inconsistencies between chord-symbol and MusicXml around the 11th in dominant chords
const normalizeIntervals = (musicxmlKind, chord) => {
	const chordIntervals = [...chord.normalized.intervals];

	if (['major-13th', 'dominant-13th'].includes(musicxmlKind)) {
		chordIntervals.push('11');
	} else if (['major-11th', 'dominant-11th'].includes(musicxmlKind)) {
		chordIntervals.push('3');
	}
	return chordIntervals;
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

const getThird = (allIntervals) => {
	if (allIntervals.includes('b3')) {
		return 'b3';
	} else if (allIntervals.includes('3')) {
		return '3';
	}
};

const isAltered = (interval) => {
	return interval.indexOf('b') > -1 || interval.indexOf('#') > -1;
};

const is9thIn69 = (interval, musicXmlKind) => {
	return (
		interval === '9' &&
		['major-sixth', 'minor-sixth'].includes(musicXmlKind)
	);
};

const isExtensionInMiMa = (interval, musicXmlKind, chord) => {
	const extensions = ['9', '11', '13'];
	return (
		musicXmlKind === 'major-minor' &&
		isExtended(chord) &&
		extensions.includes(interval) &&
		!chord.normalized.adds.includes(interval)
	);
};

const is4thInSuspended = (interval, chord) => {
	return interval === '4' && chord.normalized.isSuspended;
};

const isAltChord = (chord) => {
	return chord.normalized.intents.alt;
};

const hasThird = (intervals) => {
	return hasOneOf(intervals, ['b3', '3']);
};

const hasFifth = (intervals) => {
	return hasOneOf(intervals, ['b5', '5', '#5', 'b13']);
};

export { musicXmlRenderer };
