/**
 * Those helpers allow to create the jstoxml data structures that represents the harmony object
 */

/**
 * Xml note in the jstoxml format
 * @typedef {Object} XmlNode
 * @type {Object}
 * @property {String} _name - xml tag
 * @property {String|XmlNode} [_content] - tag content
 * @property {Object} [_attrs] - tag attributes
 */

/**
 * @param {String} kind
 * @param {String} text
 * @returns {XmlNode}
 */
const getKind = (kind, text) => {
	return {
		_name: 'kind',
		_attrs: {
			text,
		},
		_content: kind,
	};
};

/**
 * @param {('root'|'bass')} noteKind
 * @param {String} note
 * @returns {XmlNode}
 */
const getNote = (noteKind, note) => {
	const _content = [
		{
			_name: noteKind + '-step',
			_content: note.substring(0, 1),
		},
	];
	if (hasAccidental(note)) {
		_content.push({
			_name: noteKind + '-alter',
			_content: hasSharp(note) ? '1' : '-1',
		});
	}
	return {
		_name: noteKind,
		_content,
	};
};

/**
 * @param {('add'|'alter'|'subtract')} type
 * @param {String} degree - in the chord-symbol interval format ('3', 'b5', '#9'...)
 * @param {Boolean} printObject - if the degree is printable or not; controls the `print-object` attribute
 * @returns {XmlNode}
 */
const getDegree = (type, degree, printObject = true) => {
	const _content = [
		{
			_name: 'degree-value',
			_content: hasAccidental(degree) ? degree.substring(1) : degree,
		},
		{
			_name: 'degree-alter',
			_content: getAlter(degree),
		},
		{
			_name: 'degree-type',
			_content: type,
		},
	];

	let _attrs;
	if (!printObject) {
		_attrs = { 'print-object': 'no' };
	}

	return {
		_name: 'degree',
		_attrs,
		_content,
	};
};

const getAlter = (degree) => {
	if (hasAccidental(degree)) {
		return hasSharp(degree) ? '1' : '-1';
	}
	return '0';
};

const hasAccidental = (noteOrDegree) => {
	return noteOrDegree.indexOf('#') > -1 || noteOrDegree.indexOf('b') > -1;
};

const hasSharp = (note) => {
	return note.indexOf('#') > -1;
};

/**
 * @param {XmlNode[]} _content
 * @returns {XmlNode}
 */
const getHarmony = (_content) => {
	return {
		_name: 'harmony',
		_content,
	};
};

export { getDegree, getNote, getKind, getHarmony };
