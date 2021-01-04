/**
 * xxxx xxxxx //fixme
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
	if (note.length > 1) {
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

export { getNote, getKind, getHarmony };
