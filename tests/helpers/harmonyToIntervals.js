/**
 * Convert an harmony object to a list of intervals, based on the kind and the individual degrees.
 * Helps perform holistic testing of the generated harmony object, that should yield the same interval list
 * than the original chord-symbol object.
 */

import kindToIntervals from '../../src/kindToIntervals';

import {
	addInterval,
	removeInterval,
	sortIntervals,
} from '../../src/helpers/intervalHelpers';

const harmonyToIntervals = (kind, allDegrees = []) => {
	let allIntervals = [...kindToIntervals[kind]];

	// fix interpretation differences between chord-symbol and music xml
	if (['major-11th', 'dominant-11th'].includes(kind)) {
		allIntervals = removeInterval(allIntervals, '3');
	} else if (['major-13th', 'dominant-13th'].includes(kind)) {
		allIntervals = removeInterval(allIntervals, '11');
	}

	allDegrees.forEach((degree) => {
		const formattedInterval = getInterval(degree.value, degree.alter);

		switch (degree.type) {
			case 'add':
				allIntervals = addInterval(allIntervals, formattedInterval);
				break;
			case 'subtract':
				allIntervals = removeInterval(allIntervals, formattedInterval);
				break;
			case 'alter':
				allIntervals = removeInterval(allIntervals, degree.value);
				allIntervals = addInterval(allIntervals, formattedInterval);
				break;
		}
	});

	// in chord-symbol, b13 cancels 5
	if (allIntervals.includes('5') && allIntervals.includes('b13')) {
		allIntervals = removeInterval(allIntervals, '5');
	}

	return sortIntervals(allIntervals);
};

const getInterval = (degreeValue, degreeAlter) => {
	const alteration =
		degreeAlter === '-1' ? 'b' : degreeAlter === '1' ? '#' : '';
	return alteration + degreeValue;
};

export default harmonyToIntervals;
