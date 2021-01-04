import { toXML } from 'jstoxml';
import { getRoot, getBass, getKind, getHarmony } from '../src/harmonyHelpers';

describe('getRoot()', () => {
	test('the module exposes a getRoot() function', () => {
		expect(typeof getRoot).toBe('function');
	});

	test('returns the expected json structure for <root>', () => {
		const root = getRoot('C');
		const expected = {
			_name: 'root',
			_content: {
				_name: 'root-step',
				_content: 'C',
			},
		};
		expect(root).toEqual(expected);
	});

	test('produces the expected Xml for <root>', () => {
		const expectedXml = '<root><root-step>C</root-step></root>';
		const root = getRoot('C');
		const actualXml = toXML(root);

		expect(actualXml).toBe(expectedXml);
	});
});

describe('getBass()', () => {
	test('the module exposes a getBass() function', () => {
		expect(typeof getBass).toBe('function');
	});

	test('returns the expected json structure for <bass>', () => {
		const bass = getBass('G');
		const expected = {
			_name: 'bass',
			_content: {
				_name: 'bass-step',
				_content: 'G',
			},
		};
		expect(bass).toEqual(expected);
	});

	test('produces the expected Xml for <bass>', () => {
		const expectedXml = '<bass><bass-step>G</bass-step></bass>';
		const bass = getBass('G');
		const actualXml = toXML(bass);

		expect(actualXml).toBe(expectedXml);
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

	test('produces the expected Xml for <kind>', () => {
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
