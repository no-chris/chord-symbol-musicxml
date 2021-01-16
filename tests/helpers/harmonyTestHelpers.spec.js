import { getDegreesAsObjects } from './harmonyTestHelpers';

describe('getDegreesAsObjects', () => {
	test('returns an array of object from an "xml" data structure', () => {
		const input = {
			_name: 'harmony',
			_content: [
				{
					_name: 'root',
					_content: [{ _name: 'root-step', _content: 'C' }],
				},
				{
					_name: 'kind',
					_attrs: { text: '7' },
					_content: 'dominant-seventh',
				},
				{
					_name: 'degree',
					_attrs: { 'print-object': 'no' },
					_content: [
						{ _name: 'degree-value', _content: '3' },
						{ _name: 'degree-type', _content: 'subtract' },
					],
				},
				{
					_name: 'degree',
					_attrs: { 'print-object': 'no' },
					_content: [
						{ _name: 'degree-value', _content: '4' },
						{ _name: 'degree-type', _content: 'add' },
					],
				},
				{
					_name: 'degree',
					_content: [
						{ _name: 'degree-value', _content: '9' },
						{ _name: 'degree-alter', _content: '-1' },
						{ _name: 'degree-type', _content: 'alter' },
					],
				},
				{
					_name: 'degree',
					_content: [
						{ _name: 'degree-value', _content: '9' },
						{ _name: 'degree-alter', _content: '1' },
						{ _name: 'degree-type', _content: 'alter' },
					],
				},
			],
		};

		const expected = [
			{ value: '3', type: 'subtract', printObject: 'no' },
			{ value: '4', type: 'add', printObject: 'no' },
			{ value: '9', type: 'alter', alter: '-1' },
			{ value: '9', type: 'alter', alter: '1' },
		];

		const actual = getDegreesAsObjects(input);
		expect(actual).toEqual(expected);
	});
});
