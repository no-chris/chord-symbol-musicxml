/**
 * High level API to manipulate arrays of intervals.
 */

/**
 * @param {String[]} allIntervals - current interval list
 * @param {String} intervalToAdd - interval such as '5', 'b9'...
 * @returns {String[]} The interval list with the new value
 */
const addInterval = (allIntervals, intervalToAdd) => {
	const intervalsClone = [...allIntervals];

	if (!intervalsClone.includes(intervalToAdd)) {
		intervalsClone.push(intervalToAdd);
	}
	return intervalsClone;
};

/**
 * @param {String[]} allIntervals - current interval list
 * @param {String} intervalToRemove - interval such as '5', 'b9'...
 * @returns {String[]} The interval list without the removed value
 */
const removeInterval = (allIntervals, intervalToRemove) => {
	const intervalsClone = [...allIntervals];
	const index = intervalsClone.indexOf(intervalToRemove);

	if (index > -1) {
		intervalsClone.splice(index, 1);
	}
	return intervalsClone;
};

/**
 * @param {String[]} allIntervals - current interval list
 * @returns {String[]} The sorted interval list
 */
const sortIntervals = (allIntervals) => {
	const intervalsClone = [...allIntervals];

	intervalsClone.sort((a, b) => {
		let aSort = Number.parseFloat(a.replace(/[b#]/g, ''));
		let bSort = Number.parseFloat(b.replace(/[b#]/g, ''));

		aSort = adjustSortingValue(aSort, a);
		bSort = adjustSortingValue(bSort, b);

		return aSort - bSort;
	});
	return intervalsClone;
};

const adjustSortingValue = (sortingValue, interval) => {
	if (interval.indexOf('bb') > -1) {
		return sortingValue - 0.2;
	} else if (interval.indexOf('b') > -1) {
		return sortingValue - 0.1;
	} else if (interval.indexOf('#') > -1) {
		return sortingValue + 0.1;
	}
	return sortingValue;
};

/**
 * @param {String[]} intervals1 - first interval list
 * @param {String[]} intervals2 - second interval list to be compared with the first one
 * @returns {Boolean} True if is equal
 */
const isEqual = (intervals1, intervals2) => {
	if (intervals1.length !== intervals2.length) {
		return false;
	}
	const sorted1 = sortIntervals(intervals1);
	const sorted2 = sortIntervals(intervals2);

	return sorted1.every((interval, i) => sorted2[i] === interval);
};

/**
 * @param {String[]} allIntervals - the interval lists
 * @param {String[]} search - the looked up intervals
 * @returns {Boolean} True if at least one of the looked up intervals is present
 */

const hasOneOf = (allIntervals, search) => {
	return search.some((interval) => {
		return allIntervals.includes(interval);
	});
};

export { addInterval, removeInterval, sortIntervals, hasOneOf, isEqual };
