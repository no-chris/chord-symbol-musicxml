import { toXML } from 'jstoxml';
import {
	getDegree,
	getNote,
	getKind,
	getHarmony,
} from '../../src/helpers/harmonyHelpers';

describe('getNote()', () => {
	test('the module exposes a getNote() function', () => {
		expect(typeof getNote).toBe('function');
	});

	test('returns the expected json structure for <root> (unaltered)', () => {
		const root = getNote('root', 'C');
		const expected = {
			_name: 'root',
			_content: [
				{
					_name: 'root-step',
					_content: 'C',
				},
			],
		};
		expect(root).toEqual(expected);
	});

	test('produces the expected Xml for <root> (unaltered)', () => {
		const expectedXml = '<root><root-step>B</root-step></root>';
		const root = getNote('root', 'B');
		const actualXml = toXML(root);

		expect(actualXml).toBe(expectedXml);
	});

	test('returns the expected json structure for <root> (sharpened)', () => {
		const root = getNote('root', 'C#');
		const expected = {
			_name: 'root',
			_content: [
				{
					_name: 'root-step',
					_content: 'C',
				},
				{
					_name: 'root-alter',
					_content: '1',
				},
			],
		};
		expect(root).toEqual(expected);
	});

	test('produces the expected Xml for <root> (sharpened)', () => {
		const expectedXml =
			'<root>' +
			'<root-step>C</root-step>' +
			'<root-alter>1</root-alter>' +
			'</root>';
		const root = getNote('root', 'C#');
		const actualXml = toXML(root);

		expect(actualXml).toBe(expectedXml);
	});

	test('returns the expected json structure for <root> (flattened)', () => {
		const root = getNote('root', 'Bb');
		const expected = {
			_name: 'root',
			_content: [
				{
					_name: 'root-step',
					_content: 'B',
				},
				{
					_name: 'root-alter',
					_content: '-1',
				},
			],
		};
		expect(root).toEqual(expected);
	});

	test('produces the expected Xml for <root> (flattened)', () => {
		const expectedXml =
			'<root>' +
			'<root-step>B</root-step>' +
			'<root-alter>-1</root-alter>' +
			'</root>';
		const root = getNote('root', 'Bb');
		const actualXml = toXML(root);

		expect(actualXml).toBe(expectedXml);
	});

	test('returns the expected json structure for <bass>', () => {
		const bass = getNote('bass', 'Ab');
		const expected = {
			_name: 'bass',
			_content: [
				{
					_name: 'bass-step',
					_content: 'A',
				},
				{
					_name: 'bass-alter',
					_content: '-1',
				},
			],
		};
		expect(bass).toEqual(expected);
	});
});

describe('getKind()', () => {
	test('the module exposes a getKind() function', () => {
		expect(typeof getKind).toBe('function');
	});

	test('returns the expected json structure for <kind>', () => {
		const kind = getKind('minor-sixth', 'm6');
		const expected = {
			_name: 'kind',
			_attrs: {
				text: 'm6',
			},
			_content: 'minor-sixth',
		};
		expect(kind).toEqual(expected);
	});

	test('produces the expected Xml for <kind>', () => {
		const expectedXml = '<kind text="m6">minor-sixth</kind>';
		const kind = getKind('minor-sixth', 'm6');
		const actualXml = toXML(kind);

		expect(actualXml).toBe(expectedXml);
	});
});

describe('getDegree()', () => {
	test('the module exposes a getDegree() function', () => {
		expect(typeof getDegree).toBe('function');
	});

	test('produces the expected Xml for <degree> (add, unaltered)', () => {
		const expectedXml =
			'<degree>' +
			'<degree-value>5</degree-value>' +
			'<degree-alter>0</degree-alter>' +
			'<degree-type>add</degree-type>' +
			'</degree>';
		const degree = getDegree('add', '5');
		const actualXml = toXML(degree);

		expect(actualXml).toBe(expectedXml);
	});

	test('produces the expected Xml for <degree> (add, sharpened)', () => {
		const expectedXml =
			'<degree>' +
			'<degree-value>9</degree-value>' +
			'<degree-alter>1</degree-alter>' +
			'<degree-type>add</degree-type>' +
			'</degree>';
		const degree = getDegree('add', '#9');
		const actualXml = toXML(degree);

		expect(actualXml).toBe(expectedXml);
	});

	test('produces the expected Xml for <degree> (add, flattened)', () => {
		const expectedXml =
			'<degree>' +
			'<degree-value>13</degree-value>' +
			'<degree-alter>-1</degree-alter>' +
			'<degree-type>add</degree-type>' +
			'</degree>';
		const degree = getDegree('add', 'b13');
		const actualXml = toXML(degree);

		expect(actualXml).toBe(expectedXml);
	});

	test('produces the expected Xml for <degree> (subtract)', () => {
		const expectedXml =
			'<degree>' +
			'<degree-value>3</degree-value>' +
			'<degree-alter>0</degree-alter>' +
			'<degree-type>subtract</degree-type>' +
			'</degree>';
		const degree = getDegree('subtract', '3');
		const actualXml = toXML(degree);

		expect(actualXml).toBe(expectedXml);
	});

	test('produces the expected Xml for <degree> (alter, sharpened)', () => {
		const expectedXml =
			'<degree>' +
			'<degree-value>11</degree-value>' +
			'<degree-alter>1</degree-alter>' +
			'<degree-type>alter</degree-type>' +
			'</degree>';
		const degree = getDegree('alter', '#11');
		const actualXml = toXML(degree);

		expect(actualXml).toBe(expectedXml);
	});

	test('produces the expected Xml for <degree> (2 chars degree)', () => {
		const expectedXml =
			'<degree>' +
			'<degree-value>11</degree-value>' +
			'<degree-alter>0</degree-alter>' +
			'<degree-type>add</degree-type>' +
			'</degree>';
		const degree = getDegree('add', '11');
		const actualXml = toXML(degree);

		expect(actualXml).toBe(expectedXml);
	});

	test('produces the expected Xml for <degree> (print-object = no)', () => {
		const expectedXml =
			'<degree print-object="no">' +
			'<degree-value>11</degree-value>' +
			'<degree-alter>0</degree-alter>' +
			'<degree-type>add</degree-type>' +
			'</degree>';
		const degree = getDegree('add', '11', false);
		const actualXml = toXML(degree);

		expect(actualXml).toBe(expectedXml);
	});
});

describe('getHarmony()', () => {
	test('the module exposes a getHarmony() function', () => {
		expect(typeof getHarmony).toBe('function');
	});

	const content = [
		{ _name: 'foo1', _content: 'bar1' },
		{ _name: 'foo2', _content: 'bar2' },
		{ _name: 'foo3', _content: 'bar3' },
	];

	test('returns the expected json structure for <harmony>', () => {
		const harmony = getHarmony(content);
		const expected = {
			_name: 'harmony',
			_content: content,
		};
		expect(harmony).toEqual(expected);
	});

	test('produces the expected Xml for <harmony>', () => {
		const expectedXml =
			'<harmony>' +
			'<foo1>bar1</foo1>' +
			'<foo2>bar2</foo2>' +
			'<foo3>bar3</foo3>' +
			'</harmony>';
		const harmony = getHarmony(content);
		const actualXml = toXML(harmony);

		expect(actualXml).toBe(expectedXml);
	});
});
