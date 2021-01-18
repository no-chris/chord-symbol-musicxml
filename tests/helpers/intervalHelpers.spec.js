import {
	addInterval,
	removeInterval,
	sortIntervals,
	isEqual,
} from '../../src/helpers/intervalHelpers';

describe('addInterval', () => {
	test('do not modify the original array', () => {
		const original = ['1', '3', '5'];
		const actual = addInterval(original, 'b7');

		expect(actual).not.toBe(original);
		expect(original).toEqual(['1', '3', '5']);
	});

	test('adds an interval to the end of the existing interval array', () => {
		const original = ['1', '3', '5'];
		const actual = addInterval(original, 'b7');

		expect(actual).toEqual(['1', '3', '5', 'b7']);
	});

	test('do not duplicates intervals', () => {
		const original = ['1', '3', '5'];

		let actual = addInterval(original, '1');
		expect(actual).toEqual(['1', '3', '5']);

		actual = addInterval(original, '3');
		expect(actual).toEqual(['1', '3', '5']);

		actual = addInterval(original, '5');
		expect(actual).toEqual(['1', '3', '5']);
	});
});

describe('removeInterval', () => {
	test('do not modify the original array', () => {
		const original = ['1', '3', '5'];
		const actual = removeInterval(original, '3');

		expect(actual).not.toBe(original);
		expect(original).toEqual(['1', '3', '5']);
	});

	test('removes an interval', () => {
		const original = ['1', '3', '5'];
		const actual = removeInterval(original, '3');

		expect(actual).toEqual(['1', '5']);
	});

	test('do nothing if the interval is not part of the original array', () => {
		const original = ['1', '3', '5'];
		const actual = removeInterval(original, 'b7');

		expect(actual).toEqual(['1', '3', '5']);
	});
});

describe('sortIntervals', () => {
	test('do not modify the original array', () => {
		const original = ['5', '3', '1'];
		const actual = sortIntervals(original);

		expect(actual).not.toBe(original);
		expect(original).toEqual(['5', '3', '1']);
	});

	test('sort the intervals array', () => {
		const original = [
			'#11',
			'9',
			'b5',
			'5',
			'bb7',
			'3',
			'#9',
			'b13',
			'11',
			'7',
			'b7',
			'1',
			'b9',
			'13',
			'#5',
		];
		const actual = sortIntervals(original);

		expect(actual).toEqual([
			'1',
			'3',
			'b5',
			'5',
			'#5',
			'bb7',
			'b7',
			'7',
			'b9',
			'9',
			'#9',
			'11',
			'#11',
			'b13',
			'13',
		]);
	});
});

describe('isEqual()', () => {
	describe.each([
		[
			['1', '3', '5'],
			['1', '3', '5'],
		],
		[
			['1', 'b3', 'b5', 'b7'],
			['1', 'b3', 'b5', 'b7'],
		],
		[
			['b3', 'b5', 'b7', '1'],
			['1', 'b3', 'b5', 'b7'],
		],
	])('Should be equal:', (int1, int2) => {
		test(int1.join(',') + ' = ' + int2.join(','), () => {
			expect(isEqual(int1, int2)).toBe(true);
		});
	});

	describe.each([
		[
			['1', '3', '5'],
			['1', '5'],
		],
		[
			['1', 'b3', 'b5', 'b7'],
			['1', 'b3', 'b5', 'bb7'],
		],
		[['5'], ['b5']],
	])('Should NOT be equal:', (int1, int2) => {
		test(int1.join(',') + ' != ' + int2.join(','), () => {
			expect(isEqual(int1, int2)).toBe(false);
		});
	});
});
