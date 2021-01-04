import { getNote, getKind, getHarmony } from './harmonyHelpers';

/**
 * @param {Chord} chord
 * @returns {Chord}
 */
const musicXmlRenderer = (chord) => {
	const harmony = [
		getNote('root', chord.formatted.rootNote),
		getKind(chord.normalized.quality, chord.formatted.descriptor),
	];

	if (chord.formatted.bassNote) {
		const bassNote = getNote('bass', chord.formatted.bassNote);
		harmony.push(bassNote);
	}

	chord.musicxml = getHarmony(harmony);

	return chord;
};

export default musicXmlRenderer;
