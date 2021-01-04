import { getRoot, getKind, getBass, getHarmony } from './harmonyHelpers';

/**
 * @param {Chord} chord
 * @returns {Chord}
 */
const musicXmlRenderer = (chord) => {
	const harmony = [
		getRoot(chord.formatted.rootNote),
		getKind(chord.normalized.quality, chord.formatted.descriptor),
	];

	if (chord.formatted.bassNote) {
		harmony.push(getBass(chord.formatted.bassNote));
	}

	chord.musicxml = getHarmony(harmony);

	return chord;
};

export default musicXmlRenderer;
