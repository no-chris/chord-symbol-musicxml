import { removeInterval } from './intervalHelpers';

const kindToIntervals = {};

const sixth = '6';
const majorSeventh = '7';
const minorSeventh = 'b7';
const dimSeventh = 'bb7';
const ninth = '9';
const eleventh = '11';
const thirteenth = '13';

// ===== Triads =====

kindToIntervals.major = ['1', '3', '5']; // major (major third, perfect fifth)
kindToIntervals.minor = ['1', 'b3', '5']; // minor (minor third, perfect fifth)
kindToIntervals.augmented = ['1', '3', '#5']; // augmented (major third, augmented fifth)
kindToIntervals.diminished = ['1', 'b3', 'b5']; // diminished (minor third, diminished fifth)

// ===== Seventh =====

kindToIntervals.dominant = [...kindToIntervals.major, minorSeventh]; // dominant (major triad, minor seventh)
kindToIntervals['major-seventh'] = [...kindToIntervals.major, majorSeventh]; // major-seventh (major triad, major seventh)
kindToIntervals['minor-seventh'] = [...kindToIntervals.minor, minorSeventh]; // minor-seventh (minor triad, minor seventh)
kindToIntervals['diminished-seventh'] = [
	...kindToIntervals.diminished,
	dimSeventh,
]; // diminished-seventh (diminished triad, diminished seventh)
kindToIntervals['augmented-seventh'] = [
	...kindToIntervals.augmented,
	minorSeventh,
]; // augmented-seventh (augmented triad, minor seventh)
kindToIntervals['half-diminished'] = [
	...kindToIntervals.diminished,
	minorSeventh,
]; // half-diminished (diminished triad, minor seventh)
kindToIntervals['major-minor'] = [...kindToIntervals.minor, majorSeventh]; // major-minor (minor triad, major seventh)

// ===== Sixths =====

kindToIntervals['major-sixth'] = [...kindToIntervals.major, sixth]; // major-sixth (major triad, added sixth)
kindToIntervals['minor-sixth'] = [...kindToIntervals.minor, sixth]; // minor-sixth (minor triad, added sixth)

// ===== Ninths =====

kindToIntervals['dominant-ninth'] = [...kindToIntervals['dominant'], ninth]; // dominant-ninth (dominant-seventh, major ninth)
kindToIntervals['major-ninth'] = [...kindToIntervals['major-seventh'], ninth]; // major-ninth (major-seventh, major ninth)
kindToIntervals['minor-ninth'] = [...kindToIntervals['minor-seventh'], ninth]; // minor-ninth (minor-seventh, major ninth)

// ===== 11ths (usually as the basis for alteration) =====

kindToIntervals['dominant-11th'] = [
	...removeInterval(kindToIntervals['dominant-ninth'], '3'), // major 11th does not contain '3' in chord-symbol
	eleventh,
]; // dominant-11th (dominant-ninth, perfect 11th)
kindToIntervals['major-11th'] = [
	...removeInterval(kindToIntervals['major-ninth'], '3'), // major 11th does not contain '3' in chord-symbol
	eleventh,
]; // major-11th (major-ninth, perfect 11th)
kindToIntervals['minor-11th'] = [...kindToIntervals['minor-ninth'], eleventh]; // minor-11th (minor-ninth, perfect 11th)

// ===== 13ths (usually as the basis for alteration) =====

kindToIntervals['dominant-13th'] = [
	...kindToIntervals['dominant-ninth'], // major dominant 13th does not contain 11th in chord-symbol
	thirteenth,
]; // dominant-13th (dominant-11th, major 13th)
kindToIntervals['major-13th'] = [
	...kindToIntervals['major-ninth'], // major dominant 13th does not contain 11th in chord-symbol
	thirteenth,
]; // major-13th (major-11th, major 13th)
kindToIntervals['minor-13th'] = [...kindToIntervals['minor-11th'], thirteenth]; // minor-13th (minor-11th, major 13th)

// ===== Suspended =====

kindToIntervals['suspended-second'] = ['1', '5', '9']; // suspended-second (major second, perfect fifth)
kindToIntervals['suspended-fourth'] = ['1', '4', '5']; // suspended-fourth (perfect fourth, perfect fifth)

/*
// Functional sixths:
{ qualityIntervals: [], quality: 'Neapolitan' }, //
{ qualityIntervals: [], quality: 'Italian' }, //
{ qualityIntervals: [], quality: 'French' }, //
{ qualityIntervals: [], quality: 'German' }, //

// Other:
{ qualityIntervals: [], quality: 'Tristan' }, //
*/

// ===== Other =====

//kindToIntervals['pedal'] = ['1']; // pedal (pedal-point bass)
kindToIntervals['power'] = ['1', '5']; // power (perfect fifth)
kindToIntervals['other'] = ['1']; // The "other" kind is used when the harmony is entirely composed of add elements.
//kindToIntervals['none'] = [];

export default kindToIntervals;
