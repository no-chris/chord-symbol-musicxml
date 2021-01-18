/**
 * High level API to manipulate arrays of intervals.
 */

const addInterval = (allIntervals, intervalToAdd) => {
	const intervalsClone = [...allIntervals];

	if (!intervalsClone.includes(intervalToAdd)) {
		intervalsClone.push(intervalToAdd);
	}
	return intervalsClone;
};

const removeInterval = (allIntervals, intervalToRemove) => {
	const intervalsClone = [...allIntervals];
	const index = intervalsClone.indexOf(intervalToRemove);

	if (index > -1) {
		intervalsClone.splice(index, 1);
	}
	return intervalsClone;
};

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

const isEqual = (intervals1, intervals2) => {
	if (intervals1.length !== intervals2.length) {
		return false;
	}
	const sorted1 = sortIntervals(intervals1);
	const sorted2 = sortIntervals(intervals2);

	return sorted1.every((interval, i) => sorted2[i] === interval);
};

export { addInterval, removeInterval, sortIntervals, isEqual };
